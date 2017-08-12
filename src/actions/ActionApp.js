import * as actionTypes from '../actionTypes';

export function Login(user) {
  return {
    type: actionTypes.LOGIN,
    payload: user,
  }
}
