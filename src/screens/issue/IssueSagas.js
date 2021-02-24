import {call, put} from 'redux-saga/effects';
import {GENetworkHandler} from '../../util/GENetworkHandler';
import {ISSUES, REPOS} from '../../util/NetworkConstants';
import {
  CREATE_ISSUE_SUCCESS_ACTION,
  CREATE_ISSUE_FAIL_ACTION,
} from './IssueActions';

export function* createIssue(action) {
  const {name, owner, title, body} = action.payload;
  try {
    console.log('action.payload:  ', action.payload);
    console.log(
      '${REPOS}/${owner}/${name}${ISSUES}',
      `${REPOS}/${owner}/${name}${ISSUES}`,
    );
    const createIssueReponse = yield call(
      GENetworkHandler.post,
      `${REPOS}/${owner}/${name}${ISSUES}`,
      {
        title,
        body,
      },
    );
    if (createIssueReponse && createIssueReponse.status === 200) {
      yield put({
        type: CREATE_ISSUE_SUCCESS_ACTION,
      });
    } else {
      yield put({
        type: CREATE_ISSUE_FAIL_ACTION,
      });
    }
  } catch (error) {
    console.log('error while createing issue: ', error);
    yield put({
      type: CREATE_ISSUE_FAIL_ACTION,
    });
  }
}
