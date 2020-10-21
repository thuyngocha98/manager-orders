import * as types from '@actions/authActionType';

// LOG IN
export const reduxAuthLogIn = payload => ({
  type: types.LOG_IN,
  payload: payload,
});

// SIGN UP
export const reduxAuthSignUp = payload => ({
  type: types.SIGN_UP,
  payload: payload,
});

// LOG OUT
export const reduxAuthLogOut = () => ({
  type: types.LOG_OUT,
});

// UPDATE USER
export const reduxUpdateUser = payload => ({
  type: types.UPDATE_USER,
  payload: payload,
});
