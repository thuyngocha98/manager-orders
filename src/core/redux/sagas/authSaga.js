// Imports: Dependencies
import {
  takeLatest,
  put,
  call,
  take,
  cancelled,
  fork,
  delay,
} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import auth from '@react-native-firebase/auth';
import {logout, updateUser} from '@services/firebase/auth';
//
// CREATE EVENT CHANNEL LISTENER AUTH STATE USER
//
function getAuthChannel() {
  if (!this.authChannel) {
    this.authChannel = eventChannel(emit => {
      const unsubscribe = auth().onAuthStateChanged(user => emit({user}));
      return unsubscribe;
    });
  }
  return this.authChannel;
}
function* watchForFirebaseAuth() {
  const channel = yield call(getAuthChannel);
  try {
    while (true) {
      const user = yield take(channel);
      if (user.user) {
        yield put({
          type: 'USER_ASYNC',
          user: user.user,
        });
        yield delay(500);
        yield put({
          type: 'LOADING_ASYNC',
        });
      } else {
        yield put({
          type: 'NO_USER_ASYNC',
          user: user.user,
        });
        yield delay(500);
        yield put({
          type: 'LOADING_ASYNC',
        });
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}
export function* flowAuth() {
  yield fork(watchForFirebaseAuth);
}

//
// UPDATE USER SAGA
//
function* updateUserAsync(action) {
  try {
    let user = yield updateUser(action.payload.objectDataEdit);
    yield put({
      type: 'UPDATE_USER_ASYNC',
      user: user,
    });
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch update user
export function* watchUpdateUser() {
  // Take Last Action
  yield takeLatest('UPDATE_USER', updateUserAsync);
}

//
// LOG OUT SAGA
//
function* logOutAsync() {
  try {
    yield logout();
  } catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}
// Generator: Watch log out
export function* watchLogOut() {
  // Take Last Action
  yield takeLatest('LOG_OUT', logOutAsync);
}
