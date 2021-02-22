import {takeLatest} from 'redux-saga/effects';
import {loginSaga} from '../screens/auth/AuthSagas';
import {LOGIN_ACTION} from '../screens/auth/AuthActions';

export default function* sagas() {
  yield takeLatest(LOGIN_ACTION, loginSaga);
}
