import {
  REGISTER_ACTION,
  REGISTER_FAIL_ACTION,
  REGISTER_SUCCESS_ACTION,
} from './AuthActions';

const INITIAL_STATE = {
  registrationSuccess: false,
  registrationInProgress: false,
  registrationFail: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log('actions: ', action);
  switch (action.type) {
    case REGISTER_ACTION:
      state = {
        ...state,
        registrationInProgress: true,
        registrationFail: false,
      };
      break;
    case REGISTER_SUCCESS_ACTION:
      state = {
        ...state,
        registrationSuccess: true,
        registrationInProgress: false,
        registrationFail: false,
      };
      break;
    case REGISTER_FAIL_ACTION:
      state = {
        ...state,
        registrationInProgress: false,
        registrationSuccess: false,
        registrationFail: true,
      };
      break;
  }
  return state;
};
