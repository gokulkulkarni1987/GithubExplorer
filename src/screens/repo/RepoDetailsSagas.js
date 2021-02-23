import {call, put} from 'redux-saga/effects';
import db from '../../db/config';
import {GENetworkHandler} from '../../util/GENetworkHandler';
import {ISSUES, REPOS} from '../../util/NetworkConstants';
import {
  BOOKMARK_REPO_SUCCESS_ACTION,
  FETCH_REPO_ISSUES_SUCCESS_ACTION,
} from './RepoActions';

export function* fetchRepoIssues(action) {
  console.log('inside fetchRepoIssues', action);
  const {repo, owner} = action.payload;
  const repoIssuesReponse = yield call(
    GENetworkHandler.get,
    `${REPOS}/${owner}/${repo}${ISSUES}?page=1&per_page=5`,
  );

  if (repoIssuesReponse && repoIssuesReponse.status === 200) {
    yield put({
      type: FETCH_REPO_ISSUES_SUCCESS_ACTION,
      payload: repoIssuesReponse.data,
    });
  }
}

export function* bookmarkTheRepo(action) {
  console.log('inside bookmarkTheRepo', action);
  const repoId = yield call(checkAndInsertRepo, action.payload.repository);
  const userRepo = yield call(
    createUserRepoAssociation,
    action.payload.userId,
    repoId,
  );

  yield put({
    type: BOOKMARK_REPO_SUCCESS_ACTION,
    payload: userRepo,
  });
}

const createUserRepoAssociation = (userId, repoId) => {
  return new Promise((resolve, reject) => {
    const currLongTime = new Date().getTime();
    db.executeSql(
      'insert into users_repos(user, repo, created_time) values (?, ?, ?)',
      [userId, repoId, currLongTime],
      (arg) => {
        resolve(arg);
      },
      (e) => {
        reject(e);
      },
    );
  });
};

const checkAndInsertRepo = (repo) => {
  const {id, name, owner, description} = repo;
  const {login} = owner;
  return new Promise((resolve, reject) => {
    db.executeSql(
      `select * from github_repos where id='${id}';`,
      [],
      (tx, results) => {
        let resultsLen = tx.rows.length;
        if (resultsLen === 0) {
          db.executeSql(
            `insert into github_repos(github_repo_id, name, description, owner) values(${id}, '${name}', '${description}', '${login}')`,
            [],
            (arg) => {
              resolve(arg.insertId);
            },
            (e) => {
              reject(e);
            },
          );
        } else {
          resolve(id);
        }
      },
    );
  });
};
