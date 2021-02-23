import {call, put} from 'redux-saga/effects';
import {GENetworkHandler} from '../../util/GENetworkHandler';
import {SEARCH_REPO} from '../../util/NetworkConstants';
import {SEARCH_REPO_SUCCESS_ACTION} from './HomeActions';

export function* searchRepoSaga(action) {
  const {searchQuery, page, pageSize, repositories} = action.payload;
  const repoResponse = yield call(
    GENetworkHandler.get,
    SEARCH_REPO + `?q=${searchQuery}&page=${page}&per_page=${pageSize}`,
  );
  if (repoResponse && repoResponse.status === 200) {
    console.log('repoResponserepoResponse: ', repoResponse);
    repositories.push(...repoResponse.data.items);
    yield put({
      type: SEARCH_REPO_SUCCESS_ACTION,
      payload: repositories,
    });
  }
}
