import {
  takeLatest,
  put,
  take,
  call,
  cancelled,
  fork,
  select,
  cancel,
} from 'redux-saga/effects';
import {
  getCustomer,
  addCustomer,
  editCustomer,
  deleteCustomer,
} from '@services/firebase/customer';
import firestore from '@react-native-firebase/firestore';
import {eventChannel} from 'redux-saga';

//
// CREATE EVENT CHANNEL LISTENER DATA FROM FIREBASE
//
function subscribeToGetListCustomer(userId) {
  const ref = firestore()
    .collection('users')
    .doc(userId)
    .collection('customer')
    .orderBy('createAt', 'desc');
  return eventChannel(emmiter => {
    ref.onSnapshot({includeMetadataChanges: true}, querySnapshot => {
      const listCustomer = [];
      if (querySnapshot) {
        querySnapshot.forEach(doc => {
          let obj = doc.data();
          obj.id = doc.id;
          listCustomer.push(obj);
        });
        if (querySnapshot.docChanges().length !== 0) {
          emmiter(listCustomer);
        }
      }
    });
    return () => ref;
  });
}

function* fetchData(userId) {
  const channel = yield call(subscribeToGetListCustomer, userId);
  try {
    while (true) {
      const data = yield take(channel);
      yield put({
        type: 'UPDATE_CUSTOMER_ASYNC',
        data: data,
      });
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

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
export function* channelCustomer() {
  while (yield take(['USER_ASYNC'])) {
    yield call(awaitFetchUserFinished);
    const userId = yield call(getUserId);
    const task = yield fork(fetchData, userId);
    const action = yield take('NO_USER_ASYNC');
    if (action) {
      yield cancel(task);
      yield put({
        type: 'UPDATE_CUSTOMER_ASYNC',
        data: [],
      });
    }
  }
}

//
// GET LIST CUSTOMER SAGA
//
function* getCustomerAsync(action) {
  try {
    const data = yield getCustomer(action.payload.userId);
    yield put({
      type: 'GET_CUSTOMER_ASYNC',
      data: data,
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch get data
export function* watchGetCustomer() {
  // Take Last Action
  yield takeLatest('GET_CUSTOMER', getCustomerAsync);
}

//
// ADD CUSTOMER SAGA
//
function* addCustomerAsync(action) {
  try {
    yield addCustomer(
      action.payload.userId,
      action.payload.documentId,
      action.payload.data,
    );
    yield put({
      type: 'ADD_CUSTOMER_ASYNC',
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch add data
export function* watchAddCustomer() {
  // Take Last Action
  yield takeLatest('ADD_CUSTOMER', addCustomerAsync);
}

//
// EDIT CUSTOMER SAGA
//
function* editCustomerAsync(action) {
  try {
    yield editCustomer(
      action.payload.userId,
      action.payload.documentId,
      action.payload.objectDataEdit,
    );
    yield put({
      type: 'EDIT_CUSTOMER_ASYNC',
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch edit data
export function* watchEditCustomer() {
  // Take Last Action
  yield takeLatest('EDIT_CUSTOMER', editCustomerAsync);
}

//
// DELETE CUSTOMER SAGA
//
function* deleteCustomerAsync(action) {
  try {
    yield deleteCustomer(action.payload.userId, action.payload.customerId);
    yield put({
      type: 'DELETE_CUSTOMER_ASYNC',
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch delete data
export function* watchDeleteCustomer() {
  // Take Last Action
  yield takeLatest('DELETE_CUSTOMER', deleteCustomerAsync);
}
