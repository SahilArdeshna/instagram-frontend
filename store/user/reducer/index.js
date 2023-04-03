import * as actionTypes from "../actions/actionTypes";

// Initial state
const initialState = {
  user: null,
  error: null,
  loading: false,
  suggesion: {
    users: [],
    page: 1,
    limit: 20,
  },
  search: {
    users: [],
    page: 1,
    limit: 50,
    isSearching: false,
  },
  socialStats: {
    userId: null,
    following: [],
    followers: [],
    isLoading: false,
  },
  isImageProcessing: false,
};

// Reducer function
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.USER_FAILD:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.USER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case actionTypes.USER_FETCHED:
      return {
        ...state,
        user: {
          ...action.user,
          posts: action.posts,
        },
      };
    case actionTypes.USER_INIT:
      return {
        ...initialState,
      };

    case actionTypes.USER_PROFILE_IMAGE_START:
      return {
        ...state,
        error: null,
        isImageProcessing: true,
      };
    case actionTypes.USER_PROFILE_IMAGE_FAILD:
      return {
        ...state,
        error: action.error,
        isImageProcessing: false,
      };
    case actionTypes.USER_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        error: null,
        isImageProcessing: false,
      };
    case actionTypes.USER_SEARCH_START:
      return {
        ...state,
        search: {
          ...state.search,
          isSearching: true,
        },
      };
    case actionTypes.USER_SEARCH_FAILED:
      return {
        ...state,
        search: {
          ...state.search,
          isSearching: false,
        },
      };
    case actionTypes.USER_SEARCH_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          isSearching: false,
          users: action.users,
        },
      };
    case actionTypes.USER_SOCIAL_STATS_START:
      return {
        ...state,
        socialStats: {
          ...state.socialStats,
          isSearching: true,
        },
      };
    case actionTypes.USER_SOCIAL_STATS_FAILD:
      return {
        ...state,
        socialStats: {
          ...state.socialStats,
          isSearching: false,
        },
      };
    case actionTypes.USER_SOCIAL_STATS_UPDATE:
      return {
        ...state,
        socialStats: {
          ...state.socialStats,
          isSearching: false,
          userId: action.userId,
          [action.type]: action.stats,
        },
      };
    default:
      return state;
  }
};
