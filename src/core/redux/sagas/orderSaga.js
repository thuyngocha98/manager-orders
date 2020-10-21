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
  getOrders,
  addOrder,
  editOrder,
  deleteOrder,
} from '@services/firebase/order';
import firestore from '@react-native-firebase/firestore';
import {eventChannel} from 'redux-saga';

//
// CREATE EVENT CHANNEL LISTENER DATA FROM FIREBASE
//
function subscribeToGetListOrders(userId) {
  const ref = firestore()
    .collection('users')
    .doc(userId)
    .collection('orders')
    .orderBy('createAt', 'desc');
  return eventChannel(emmiter => {
    ref.onSnapshot({includeMetadataChanges: true}, querySnapshot => {
      const listOrders = [];
      if (querySnapshot) {
        querySnapshot.forEach(doc => {
          let obj = doc.data();
          obj.id = doc.id;
          listOrders.push(obj);
        });
        if (querySnapshot.docChanges().length !== 0) {
          emmiter(listOrders);
        }
      }
    });
    return () => ref;
  });
}

function* fetchData(userId) {
  const channel = yield call(subscribeToGetListOrders, userId);
  try {
    while (true) {
      const data = yield take(channel);
      yield put({
        type: 'UPDATE_ORDER_ASYNC',
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
export function* channelOrder() {
  while (yield take(['USER_ASYNC'])) {
    yield call(awaitFetchUserFinished);
    const userId = yield call(getUserId);
    const task = yield fork(fetchData, userId);
    const action = yield take('NO_USER_ASYNC');
    if (action) {
      yield cancel(task);
      yield put({
        type: 'UPDATE_ORDER_ASYNC',
        data: [],
      });
    }
  }
}

//
// GET LIST ORDERS SAGA
//
function* getOrdersAsync(action) {
  try {
    const data = yield getOrders(action.payload.userId);
    yield put({
      type: 'GET_ORDER_ASYNC',
      data: data,
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch get data
export function* watchGetOrder() {
  // Take Last Action
  yield takeLatest('GET_ORDER', getOrdersAsync);
}

//
// ADD ORDER SAGA
//
function* addOrderAsync(action) {
  try {
    yield addOrder(
      action.payload.userId,
      action.payload.documentId,
      action.payload.data,
    );
    yield put({
      type: 'ADD_ORDER_ASYNC',
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch add data
export function* watchAddOrder() {
  // Take Last Action
  yield takeLatest('ADD_ORDER', addOrderAsync);
}

//
// EDIT ORDER SAGA
//
function* editOrderAsync(action) {
  try {
    yield editOrder(
      action.payload.userId,
      action.payload.documentId,
      action.payload.objectDataEdit,
    );
    yield put({
      type: 'EDIT_ORDER_ASYNC',
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch edit data
export function* watchEditOrder() {
  // Take Last Action
  yield takeLatest('EDIT_ORDER', editOrderAsync);
}

//
// DELETE ORDER SAGA
//
function* deleteOrderAsync(action) {
  try {
    yield deleteOrder(action.payload.userId, action.payload.orderId);
    yield put({
      type: 'DELETE_ORDER_ASYNC',
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch delete data
export function* watchDeleteOrder() {
  // Take Last Action
  yield takeLatest('DELETE_ORDER', deleteOrderAsync);
}
