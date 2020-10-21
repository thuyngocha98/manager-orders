import * as types from '@actions/customerActionType';

// GET LIST CUSTOMER
export const reduxGetCustomer = payload => ({
  type: types.GET_CUSTOMER,
  payload: payload,
});
// ADD CUSTOMER
export const reduxAddCustomer = payload => ({
  type: types.ADD_CUSTOMER,
  payload: payload,
});
// EDIT CUSTOMER
export const reduxEditCustomer = payload => ({
  type: types.EDIT_CUSTOMER,
  payload: payload,
});
// DELETE CUSTOMER
export const reduxDeleteCustomer = payload => ({
  type: types.DELETE_CUSTOMER,
  payload: payload,
});
