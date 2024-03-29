import * as actionTypes from "../actions/actionTypes";

// Initial state
const initialState = {
  deleteModal: {
    show: false,
    postId: null,
  },
  unfollowModal: {
    show: false,
    author: null,
  },
  actionModal: {
    show: false,
    postId: null,
    author: null,
    isFollowing: false,
  },
  settingModal: {
    show: false,
  },
  createModal: {
    files: [],
    exit: false,
    show: false,
    discard: false,
  },
  socialStats: {
    show: false,
    userId: null,
    following: [],
    followers: [],
    actionType: "",
    isLoading: false,
  },
  profileUploadModal: {
    show: false,
    uploadProfile: false,
  },
};

// Reducer function
export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODAL_ACTION_OPEN:
      return {
        ...state,
        actionModal: {
          show: true,
          postId: action.postId,
          author: action.author,
          isFollowing: action.isFollowing,
        },
      };
    case actionTypes.MODAL_ACTION_CLOSE:
      return {
        ...state,
        actionModal: {
          ...initialState.actionModal,
        },
      };
    case actionTypes.MODAL_SETTING_OPEN:
      return {
        ...state,
        settingModal: {
          show: true,
        },
      };
    case actionTypes.MODAL_SETTING_CLOSE:
      return {
        ...state,
        settingModal: {
          ...initialState.settingModal,
        },
      };
    case actionTypes.MODAL_DELETE_OPEN:
      return {
        ...state,
        deleteModal: {
          show: true,
          postId: action.postId,
        },
      };
    case actionTypes.MODAL_DELETE_CLOSE:
      return {
        ...state,
        deleteModal: {
          ...initialState.deleteModal,
        },
      };
    case actionTypes.MODAL_UNFOLLOW_OPEN:
      return {
        ...state,
        unfollowModal: {
          show: true,
          author: action.author,
        },
      };
    case actionTypes.MODAL_UNFOLLOW_CLOSE:
      return {
        ...state,
        unfollowModal: {
          ...initialState.unfollowModal,
        },
      };
    case actionTypes.MODAL_CREATE_OPEN:
      return {
        ...state,
        createModal: {
          ...state.createModal,
          show: true,
        },
      };
    case actionTypes.MODAL_CREATE_CLOSE:
      return {
        ...state,
        createModal: {
          ...initialState.createModal,
        },
      };
    case actionTypes.MODAL_CREATE_UPDATE_DISCARD:
      return {
        ...state,
        createModal: {
          ...state.createModal,
          discard: action.discard,
        },
      };
    case actionTypes.MODAL_CREATE_UPDATE_FILE:
      return {
        ...state,
        createModal: {
          ...state.createModal,
          files: action.files,
        },
      };
    case actionTypes.MODAL_CREATE_EXIT:
      return {
        ...state,
        createModal: {
          ...state.createModal,
          exit: action.exit,
        },
      };
    case actionTypes.MODAL_SOCIAL_STATS_START:
      return {
        ...state,
        socialStats: {
          ...state.socialStats,
          isLoading: true,
        },
      };
    case actionTypes.MODAL_SOCIAL_STATS_OPEN:
      return {
        ...state,
        socialStats: {
          ...state.socialStats,
          show: true,
          isLoading: false,
          userId: action.userId,
          actionType: action.actionType,
          [action.actionType]: action.stats,
        },
      };
    case actionTypes.MODAL_SOCIAL_STATS_CLOSE:
      return {
        ...state,
        socialStats: {
          ...state.socialStats,
          show: false,
        },
      };
    case actionTypes.MODAL_SOCIAL_STATS_FAILD:
      return {
        ...state,
        socialStats: {
          ...state.socialStats,
          isLoading: false,
        },
      };
    case actionTypes.MODAL_PROFILE_UPLOAD_OPEN:
      return {
        ...state,
        profileUploadModal: {
          show: true,
          uploadProfile: false,
        },
      };
    case actionTypes.MODAL_PROFILE_UPLOAD_CLOSE:
      return {
        ...state,
        profileUploadModal: {
          show: false,
          uploadProfile: false,
        },
      };
    case actionTypes.MODAL_PROFILE_UPLOAD_UPDATE:
      return {
        ...state,
        profileUploadModal: {
          ...state.profileUploadModal,
          uploadProfile: action.profileUpload,
        },
      };
    default:
      return state;
  }
};
