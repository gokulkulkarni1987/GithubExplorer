import {
  FETCH_BOOKMARKED_REPO_ACTION,
  FETCH_BOOKMARKED_REPO_SUCCESS_ACTION,
} from './HomeActions';

const INITIAL_STATE = {
  repositories: [],
  fetchingInProgress: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BOOKMARKED_REPO_ACTION:
      state = {
        ...state,
        fetchingInProgress: true,
      };
      break;
    case FETCH_BOOKMARKED_REPO_SUCCESS_ACTION:
      state = {
        ...state,
        repositories: action.payload,
        fetchingInProgress: false,
      };
  }
  return state;
};
