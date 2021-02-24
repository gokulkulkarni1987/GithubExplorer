import {
  CREATE_ISSUE_ACTION,
  CREATE_ISSUE_FAIL_ACTION,
  CREATE_ISSUE_SUCCESS_ACTION,
  CREATE_ISSUE_CLEAR_ACTION,
} from './IssueActions';

const INITITAL_STATE = {
  issueCreateInProgress: false,
  issueCreationStatus: '',
};

export default (state = INITITAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ISSUE_ACTION:
      state = {
        ...state,
        issueCreateInProgress: true,
      };
      break;
    case CREATE_ISSUE_SUCCESS_ACTION:
      state = {
        ...state,
        issueCreateInProgress: false,
        issueCreationStatus: 'SUCCESS',
      };
      break;
    case CREATE_ISSUE_FAIL_ACTION:
      state = {
        ...state,
        issueCreateInProgress: false,
        issueCreationStatus: 'FAIL',
      };
      break;
    case CREATE_ISSUE_CLEAR_ACTION:
      state = {
        ...state,
        issueCreateInProgress: false,
        issueCreationStatus: '',
      };
      break;
  }
  return state;
};
