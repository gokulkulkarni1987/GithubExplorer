import {
  LOGIN_ACTION,
  LOGIN_ACTION_SUCCESS,
  LOGIN_ACTION_FAIL,
} from './AuthActions';

const INITIAL_STATE = {
  loginSuccess: false,
  loginInProgress: false,
  loginFail: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log('actions: ', action);
  switch (action.type) {
    case LOGIN_ACTION:
      state = {
        ...state,
        loginInProgress: true,
        loginFail: false,
      };
      break;
    case LOGIN_ACTION_SUCCESS:
      state = {
        ...state,
        loginSuccess: true,
        loginInProgress: false,
        loginFail: false,
      };
      break;
    case LOGIN_ACTION_FAIL:
      state = {
        ...state,
        loginInProgress: false,
        loginSuccess: false,
        loginFail: true,
      };
      break;
  }
  return state;
};
