// Imports: Dependencies
import {all, fork} from 'redux-saga/effects';

// Imports: Redux Sagas
import {
  watchGetCustomer,
  watchAddCustomer,
  watchEditCustomer,
  watchDeleteCustomer,
  channelCustomer,
} from '@sagas/customerSaga';

import {
  watchAddOrder,
  watchEditOrder,
  watchDeleteOrder,
  channelOrder,
} from '@sagas/orderSaga';

import {
  channelProduct,
  watchGetProduct,
  watchAddProduct,
  watchEditProduct,
  watchDeleteProduct,
  flowUpdateProduct,
  watchUpdateLinkImageProduct,
  watchDeleteImageProduct,
} from '@sagas/productSaga';

import {flowAuth, watchLogOut, watchUpdateUser} from '@sagas/authSaga';

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    // saga auth
    fork(flowAuth),
    fork(watchLogOut),
    fork(watchUpdateUser),
    // saga product
    fork(channelProduct),
    fork(flowUpdateProduct),
    fork(watchGetProduct),
    fork(watchAddProduct),
    fork(watchEditProduct),
    fork(watchDeleteProduct),
    fork(watchUpdateLinkImageProduct),
    fork(watchDeleteImageProduct),
    // saga customer
    fork(watchGetCustomer),
    fork(watchAddCustomer),
    fork(channelCustomer),
    fork(watchEditCustomer),
    fork(watchDeleteCustomer),
    // saga order
    //fork(watchGetOrder),
    fork(watchAddOrder),
    fork(channelOrder),
    fork(watchEditOrder),
    fork(watchDeleteOrder),
  ]);
}
