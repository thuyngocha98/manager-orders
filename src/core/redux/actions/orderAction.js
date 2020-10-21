import * as types from '@actions/orderActionType';

// GET LIST ORDER
export const reduxGetOrder = payload => ({
  type: types.GET_ORDER,
  payload: payload,
});
// ADD ORDER
export const reduxAddOrder = payload => ({
  type: types.ADD_ORDER,
  payload: payload,
});
// EDIT ORDER
export const reduxEditOrder = payload => ({
  type: types.EDIT_ORDER,
  payload: payload,
});
// DELETE ORDER
export const reduxDeleteOrder = payload => ({
  type: types.DELETE_ORDER,
  payload: payload,
});
