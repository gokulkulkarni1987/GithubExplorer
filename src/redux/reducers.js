import {combineReducers} from 'redux';
import LoginReducer from '../screens/auth/LoginReducer';
import RegisterReducer from '../screens/auth/RegisterReducer';
import AllReposReducer from '../screens/home/AllReposReducer';

export default combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  allRepositories: AllReposReducer,
});
