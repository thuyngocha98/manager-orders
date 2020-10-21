import {
  put,
  take,
  call,
  cancelled,
  fork,
  select,
  cancel,
  takeLatest,
  delay,
} from 'redux-saga/effects';
import {uploadImageAsPromise} from '@services/firebase/UploadImage';
import {eventChannel} from 'redux-saga';
import NetInfo from '@react-native-community/netinfo';
import {getDataAsyncStorage} from '@utils/AsyncStorageUtils';
import firestore from '@react-native-firebase/firestore';
import {updateUser} from '@services/firebase/auth';
import {IMAGE_UPLOAD, AVATAR_UPLOAD} from '@const/KeyAsyncStorage';

import {
  deleteProduct,
  getProduct,
  editProduct,
  addProduct,
  updateLinkImageProduct,
  deleteImage,
} from '@services/firebase/product';

// Await redux fetch data user finished
function* awaitFetchUserFinished() {
  yield call(waitFor, state => state.auth.user != null);
}
function* waitFor(selector) {
  if (yield select(selector)) {
    return;
  }
  while (true) {
    yield take(['USER_ASYNC']);
    if (yield select(selector)) {
      return;
    }
  }
}
// Get user token
function* getUserId() {
  const getUser = state => state.auth.user.uid;
  const userId = yield select(getUser);
  return userId;
}

//
// CREATE EVENT CHANNEL NETWORK STATUS
//

function subscribeToNetworkStatus() {
  return eventChannel(emitter => {
    const unsubscribe = NetInfo.addEventListener(state =>
      emitter(state.isInternetReachable || false),
    );
    return unsubscribe;
  });
}

function* startChannel(userId) {
  const channel = yield call(subscribeToNetworkStatus);
  try {
    while (true) {
      const connected = yield take(channel);
      yield delay(2000);
      if (connected) {
        let listImageInAsyncStorage = yield getDataAsyncStorage(IMAGE_UPLOAD);
        if (listImageInAsyncStorage?.length > 0) {
          for (var pathAndDocumentId of listImageInAsyncStorage) {
            let splitPathAndDocumentId = pathAndDocumentId.split('_');
            let path = splitPathAndDocumentId[0];
            let documentId = splitPathAndDocumentId[1];
            yield firestore()
              .collection('users')
              .doc(userId)
              .collection('product')
              .doc(documentId)
              .get()
              .then(async docSnapshot => {
                if (docSnapshot.exists) {
                  const fileName = path.split('/').pop();
                  let imageUrl = await uploadImageAsPromise(
                    fileName,
                    documentId,
                    IMAGE_UPLOAD,
                  );
                  if (imageUrl) {
                    await updateLinkImageProduct(userId, documentId, imageUrl);
                    await deleteImage(userId, documentId, fileName);
                  }
                }
              });
          }
        }
        let imageAvatar = yield getDataAsyncStorage(AVATAR_UPLOAD);
        if (imageAvatar?.length > 0) {
          for (var pathAndDocumentId of imageAvatar) {
            let splitPathAndDocumentId = pathAndDocumentId.split('_');
            let path = splitPathAndDocumentId[0];
            let documentId = splitPathAndDocumentId[1];
            const fileName = path.split('/').pop();
            let imageUrl = yield uploadImageAsPromise(
              fileName,
              documentId,
              AVATAR_UPLOAD,
            );
            if (imageUrl) {
              let user = yield updateUser({photoURL: imageUrl});
              yield put({
                type: 'UPDATE_USER_ASYNC',
                user: user,
              });
            }
          }
        }
        yield put({
          type: 'NETWORK_STATUS_ASYNC',
          status: true,
        });
      } else {
        yield put({
          type: 'NETWORK_STATUS_ASYNC',
          status: false,
        });
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export function* channelProduct() {
  while (true) {
    yield call(awaitFetchUserFinished);
    const userId = yield call(getUserId);
    const task = yield fork(startChannel, userId);
    const action = yield take('NO_USER_ASYNC');
    if (action) {
      yield cancel(task);
    }
  }
}

//
// CREATE EVENT CHANNEL LISTENER DATA FROM FIREBASE
//
function subscribeToGetListProduct(userId) {
  const ref = firestore()
    .collection('users')
    .doc(userId)
    .collection('product')
    .orderBy('createAt', 'desc');
  return eventChannel(emmiter => {
    ref.onSnapshot(querySnapshot => {
      const listProduct = [];
      if (querySnapshot) {
        querySnapshot.forEach(doc => {
          let obj = doc.data();
          obj.id = doc.id;
          listProduct.push(obj);
        });
        if (querySnapshot.docChanges().length !== 0) {
          emmiter(listProduct);
        }
      }
    });
    return () => ref;
  });
}

function* fetchData(userId) {
  const channel = yield call(subscribeToGetListProduct, userId);
  try {
    while (true) {
      const data = yield take(channel);
      yield put({
        type: 'UPDATE_PRODUCT_ASYNC',
        data: data,
      });
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export function* flowUpdateProduct() {
  while (yield take(['USER_ASYNC'])) {
    yield call(awaitFetchUserFinished);
    const userId = yield call(getUserId);
    const task = yield fork(fetchData, userId);
    const action = yield take('NO_USER_ASYNC');
    if (action) {
      yield cancel(task);
      yield put({
        type: 'UPDATE_PRODUCT_ASYNC',
        data: [],
      });
    }
  }
}

//
// GET LIST PRODUCT SAGA
//
function* getProductAsync(action) {
  try {
    const data = yield getProduct(action.payload.userId);
    yield put({
      type: 'GET_PRODUCT_ASYNC',
      data: data,
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch get data
export function* watchGetProduct() {
  // Take Last Action
  yield takeLatest('GET_PRODUCT', getProductAsync);
}

//
// ADD PRODUCT SAGA
//
function* addProductAsync(action) {
  try {
    yield addProduct(
      action.payload.userId,
      action.payload.documentId,
      action.payload.data,
    );
    yield put({
      type: 'ADD_PRODUCT_ASYNC',
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch add data
export function* watchAddProduct() {
  // Take Last Action
  yield takeLatest('ADD_PRODUCT', addProductAsync);
}

//
// EDIT PRODUCT SAGA
//
function* editProductAsync(action) {
  try {
    yield editProduct(
      action.payload.userId,
      action.payload.documentId,
      action.payload.objectDataEdit,
    );
    yield put({
      type: 'EDIT_PRODUCT_ASYNC',
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch edit data
export function* watchEditProduct() {
  // Take Last Action
  yield takeLatest('EDIT_PRODUCT', editProductAsync);
}

//
// UPDATE LINK IMAGE PRODUCT SAGA
//
function* updateLinkImageProductAsync(action) {
  try {
    yield updateLinkImageProduct(
      action.payload.userId,
      action.payload.documentId,
      action.payload.linkImage,
    );
    yield put({
      type: 'UPDATE_LINK_IMAGE_PRODUCT_ASYNC',
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch update link image data
export function* watchUpdateLinkImageProduct() {
  // Take Last Action
  yield takeLatest('UPDATE_LINK_IMAGE_PRODUCT', updateLinkImageProductAsync);
}

//
// DELETE IMAGE PRODUCT SAGA
//
function* deleteImageProductAsync(action) {
  try {
    yield deleteImage(
      action.payload.userId,
      action.payload.documentId,
      action.payload.linkImage,
    );
    yield put({
      type: 'DELETE_IMAGE_PRODUCT_ASYNC',
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch delete image
export function* watchDeleteImageProduct() {
  // Take Last Action
  yield takeLatest('DELETE_IMAGE_PRODUCT', deleteImageProductAsync);
}

//
// DELETE PRODUCT SAGA
//
function* deleteProductAsync(action) {
  try {
    yield deleteProduct(action.payload.userId, action.payload.productId);
    yield put({
      type: 'DELETE_PRODUCT_ASYNC',
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch delete data
export function* watchDeleteProduct() {
  // Take Last Action
  yield takeLatest('DELETE_PRODUCT', deleteProductAsync);
}
