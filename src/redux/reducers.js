import {combineReducers} from 'redux';
import LoginReducer from '../screens/auth/LoginReducer';
import RegisterReducer from '../screens/auth/RegisterReducer';

export default combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
});
