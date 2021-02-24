import {takeLatest} from 'redux-saga/effects';
import {loginSaga, registerSaga} from '../screens/auth/AuthSagas';
import {LOGIN_ACTION, REGISTER_ACTION} from '../screens/auth/AuthActions';
import {
  FETCH_BOOKMARKED_REPO_ACTION,
  SEARCH_REPO_ACTION,
} from '../screens/home/HomeActions';
import {fetchBookmarkedRepos, searchRepoSaga} from '../screens/home/HomeSagas';
import {
  BOOKMARK_REPO_ACTION,
  CHECK_USER_BOOKMARK_ACTION,
  FETCH_REPO_ISSUES_ACTION,
} from '../screens/repo/RepoActions';
import {
  bookmarkTheRepo,
  checkIfRepoIsBookmarked,
  fetchRepoIssues,
} from '../screens/repo/RepoDetailsSagas';

export default function* sagas() {
  yield takeLatest(LOGIN_ACTION, loginSaga);
  yield takeLatest(REGISTER_ACTION, registerSaga);
  yield takeLatest(SEARCH_REPO_ACTION, searchRepoSaga);
  yield takeLatest(FETCH_REPO_ISSUES_ACTION, fetchRepoIssues);
  yield takeLatest(BOOKMARK_REPO_ACTION, bookmarkTheRepo);
  yield takeLatest(FETCH_BOOKMARKED_REPO_ACTION, fetchBookmarkedRepos);
  yield takeLatest(CHECK_USER_BOOKMARK_ACTION, checkIfRepoIsBookmarked);
}
