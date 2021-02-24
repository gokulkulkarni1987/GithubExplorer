import {call, put} from 'redux-saga/effects';
import db from '../../db/config';
import {GENetworkHandler} from '../../util/GENetworkHandler';
import {ISSUES, REPOS} from '../../util/NetworkConstants';
import {
  BOOKMARK_REPO_SUCCESS_ACTION,
  CHECK_USER_BOOKMARK_SUCCESS_ACTION,
  FETCH_REPO_ISSUES_SUCCESS_ACTION,
} from './RepoActions';

export function* fetchRepoIssues(action) {
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

export function* checkIfRepoIsBookmarked(action) {
  const {userId, repoId} = action.payload;
  const isBookmarked = yield call(checkIfUserHasBookmarkedRepo, userId, repoId);
  yield put({
    type: CHECK_USER_BOOKMARK_SUCCESS_ACTION,
    payload: isBookmarked,
  });
}

const checkIfUserHasBookmarkedRepo = (userId, repoId) => {
  return new Promise((resolve, reject) => {
    db.executeSql(
      'select * from users_repos ur, github_repos gr where gr.id=ur.repo and user=? and gr.github_repo_id=?',
      [userId, repoId],
      (tx) => {
        let resultsLen = tx.rows.length;
        if (resultsLen === 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      },
      (e) => {
        console.log('unable to check use repo association: ', e);
        reject(e);
      },
    );
  });
};

export function* bookmarkTheRepo(action) {
  const {repoId, name, description, owner, userId} = action.payload;
  const newRepoId = yield call(
    checkAndInsertRepo,
    repoId,
    name,
    description,
    owner,
  );
  const userRepo = yield call(createUserRepoAssociation, userId, newRepoId);

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

const checkAndInsertRepo = (id, name, description, owner) => {
  return new Promise((resolve, reject) => {
    db.executeSql(
      `select * from github_repos where id='${id}';`,
      [],
      (tx, results) => {
        let resultsLen = tx.rows.length;
        if (resultsLen === 0) {
          db.executeSql(
            `insert into github_repos(github_repo_id, name, description, owner) values(${id}, '${name}', '${description}', '${owner}')`,
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
