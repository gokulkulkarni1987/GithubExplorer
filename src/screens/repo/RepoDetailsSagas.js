import {call, put} from 'redux-saga/effects';
import {GENetworkHandler} from '../../util/GENetworkHandler';
import {ISSUES, REPOS} from '../../util/NetworkConstants';
import {FETCH_REPO_ISSUES_SUCCESS_ACTION} from './RepoActions';

export function* fetchRepoIssues(action) {
  console.log('inside fetchRepoIssues', action);
  const {repo, owner} = action.payload;
  const repoIssuesReponse = yield call(
    GENetworkHandler.get,
    `${REPOS}/${owner}/${repo}${ISSUES}?page=1&per_page=5`,
  );
  console.log('repoIssuesReponse', repoIssuesReponse);
  if (repoIssuesReponse && repoIssuesReponse.status === 200) {
    console.log('got repo issues: ', repoIssuesReponse.data);
    yield put({
      type: FETCH_REPO_ISSUES_SUCCESS_ACTION,
      payload: repoIssuesReponse.data,
    });
  }
}
