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
    show: false,
    discard: false,
    file: "",
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
          file: action.file,
        },
      };
    default:
      return state;
  }
};
