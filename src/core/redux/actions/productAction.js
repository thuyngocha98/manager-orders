import * as types from '@actions/productActionType';

// GET LIST PRODUCT
export const reduxGetProduct = payload => ({
  type: types.GET_PRODUCT,
  payload: payload,
});
// ADD PRODUCT
export const reduxAddProduct = payload => ({
  type: types.ADD_PRODUCT,
  payload: payload,
});
// EDIT PRODUCT
export const reduxEditProduct = payload => ({
  type: types.EDIT_PRODUCT,
  payload: payload,
});
// UPDATE LINK IMAGE PRODUCT
export const reduxUpdateLinkImageProduct = payload => ({
  type: types.UPDATE_LINK_IMAGE_PRODUCT,
  payload: payload,
});
// DELETE IMAGE PRODUCT
export const reduxDeleteImageProduct = payload => ({
  type: types.DELETE_IMAGE_PRODUCT,
  payload: payload,
});
// DELETE PRODUCT
export const reduxDeleteProduct = payload => ({
  type: types.DELETE_PRODUCT,
  payload: payload,
});
