import {SEARCH_REPO_ACTION, SEARCH_REPO_SUCCESS_ACTION} from './HomeActions';

const INITIAL_STATE = {
  repositories: [],
  searchInProgress: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_REPO_ACTION:
      state = {
        ...state,
        searchInProgress: true,
      };
      break;
    case SEARCH_REPO_SUCCESS_ACTION:
      state = {
        ...state,
        repositories: action.payload,
        searchInProgress: false,
      };
  }
  return state;
};
