import {
  FETCH_REPO_ISSUES_ACTION,
  FETCH_REPO_ISSUES_SUCCESS_ACTION,
} from './RepoActions';

const INITIAL_STATE = {
  repoIssues: [],
  fetchingIssues: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_REPO_ISSUES_ACTION:
      state = {
        ...state,
        fetchingIssues: true,
      };
      break;

    case FETCH_REPO_ISSUES_SUCCESS_ACTION:
      state = {
        ...state,
        fetchingIssues: false,
        repoIssues: action.payload,
      };
      break;
  }
  return state;
};
