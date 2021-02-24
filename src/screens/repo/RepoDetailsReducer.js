import {
  BOOKMARK_REPO_SUCCESS_ACTION,
  CHECK_USER_BOOKMARK_SUCCESS_ACTION,
  FETCH_REPO_ISSUES_ACTION,
  FETCH_REPO_ISSUES_SUCCESS_ACTION,
} from './RepoActions';

const INITIAL_STATE = {
  repoIssues: [],
  fetchingIssues: false,
  isRepoBookmarked: false,
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
    case CHECK_USER_BOOKMARK_SUCCESS_ACTION:
      state = {
        ...state,
        isRepoBookmarked: action.payload,
      };
      break;
    case BOOKMARK_REPO_SUCCESS_ACTION:
      state = {
        ...state,
        isRepoBookmarked: true,
      };
      break;
  }
  return state;
};
