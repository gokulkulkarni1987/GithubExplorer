import {takeLatest} from 'redux-saga/effects';
import {loginSaga, registerSaga} from '../screens/auth/AuthSagas';
import {LOGIN_ACTION, REGISTER_ACTION} from '../screens/auth/AuthActions';

export default function* sagas() {
  yield takeLatest(LOGIN_ACTION, loginSaga);
  yield takeLatest(REGISTER_ACTION, registerSaga);
}
