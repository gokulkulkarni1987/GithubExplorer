import {call, put} from 'redux-saga/effects';
import db from '../../db/config';
import {GENetworkHandler} from '../../util/GENetworkHandler';
import {SEARCH_REPO} from '../../util/NetworkConstants';
import {
  SEARCH_REPO_SUCCESS_ACTION,
  FETCH_BOOKMARKED_REPO_FAIL_ACTION,
  FETCH_BOOKMARKED_REPO_SUCCESS_ACTION,
} from './HomeActions';

export function* searchRepoSaga(action) {
  const {searchQuery, page, pageSize, repositories} = action.payload;
  const repoResponse = yield call(
    GENetworkHandler.get,
    SEARCH_REPO + `?q=${searchQuery}&page=${page}&per_page=${pageSize}`,
  );
  if (repoResponse && repoResponse.status === 200) {
    repositories.push(...repoResponse.data.items);
    yield put({
      type: SEARCH_REPO_SUCCESS_ACTION,
      payload: repositories,
    });
  }
}

export function* fetchBookmarkedRepos(action) {
  const {userId} = action.payload;
  try {
    const bookmarkedReponse = yield call(fetchBookmarkedReposFromDB, userId);
    yield put({
      type: FETCH_BOOKMARKED_REPO_SUCCESS_ACTION,
      payload: bookmarkedReponse,
    });
  } catch (e) {
    yield put({
      type: FETCH_BOOKMARKED_REPO_FAIL_ACTION,
    });
  }
}

const fetchBookmarkedReposFromDB = (userId) => {
  return new Promise((resolve, reject) => {
    db.executeSql(
      'select gr.* from users_repos ur, users u, github_repos gr where u.id = ur.user and gr.id=ur.repo and ur.user=? order by ur.created_time DESC;',
      [userId],
      (tx, results) => {
        let resultsLen = tx.rows.length;
        const githubRepos = [];
        for (let i = 0; i < resultsLen; i++) {
          githubRepos.push(tx.rows.item(i));
        }
        resolve(githubRepos);
      },
      (e) => {
        console.log('unable to fetch github details details: ', e);
        reject(e);
      },
    );
  });
};
