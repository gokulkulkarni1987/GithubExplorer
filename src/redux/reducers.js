import {combineReducers} from 'redux';
import LoginReducer from '../screens/auth/LoginReducer';
import RegisterReducer from '../screens/auth/RegisterReducer';
import AllReposReducer from '../screens/home/AllReposReducer';
import MyBookmarkedRepoReducer from '../screens/home/MyBookmarkedRepoReducer';
import RepoDetailsReducer from '../screens/repo/RepoDetailsReducer';

export default combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  allRepositories: AllReposReducer,
  repoDetails: RepoDetailsReducer,
  bookmarkedRepos: MyBookmarkedRepoReducer,
});
