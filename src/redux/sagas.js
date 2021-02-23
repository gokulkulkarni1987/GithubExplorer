import {takeLatest} from 'redux-saga/effects';
import {loginSaga, registerSaga} from '../screens/auth/AuthSagas';
import {LOGIN_ACTION, REGISTER_ACTION} from '../screens/auth/AuthActions';
import {SEARCH_REPO_ACTION} from '../screens/home/HomeActions';
import {searchRepoSaga} from '../screens/home/HomeSagas';

export default function* sagas() {
  yield takeLatest(LOGIN_ACTION, loginSaga);
  yield takeLatest(REGISTER_ACTION, registerSaga);
  yield takeLatest(SEARCH_REPO_ACTION, searchRepoSaga);
}
