import { put } from "redux-saga/effects";

import * as actions from "../actions";
import { notify } from "../../../utils/toster";
import * as authActions from "../../auth/actions";
import * as postActions from "../../posts/actions";
import * as actionTypes from "../actions/actionTypes";
import * as authActionTypes from "../../auth/actions/actionTypes";
import {
  follow,
  getUser,
  unfollow,
  searchUser,
  fetchUserData,
  uploadProfileImage,
  deleteProfileImage,
} from "../userCrud";

// Follow function
export function* userFollowSaga(action) {
  try {
    // // Call fetch start to displaying loading spinner
    // yield put(actions.userStart());

    // Call login axios function
    const result = yield follow(action.followId);

    // If response error found throw error
    if (result.data && result.data.statusCode === 400) {
      throw new Error(result.data.message);
    }

    // Update auth user
    yield put({ type: authActionTypes.AUTH_USER_FETCH });

    if (action.userName) {
      // Fetch user data
      yield put(actions.fetchUserData(action.userName, false));
    }

    // Toster notification
    notify("success", "User followd successfully.");

    // // Call fetch success to set loading false
    // yield put(actions.userSuccess());
  } catch (err) {
    console.log(err);

    // Toster notification
    notify("error", err?.response?.data?.message);

    // Call fetch faild to store error message in state
    yield put(actions.userFaild(err?.response?.data));
  }
}

// Unfollow function
export function* userUnfollowSaga(action) {
  try {
    // // Call fetch start to displaying loading spinner
    // yield put(actions.userStart());

    // Call login axios function
    const result = yield unfollow(action.unfollowId);

    // If response error found throw error
    if (result.data && result.data.statusCode === 400) {
      throw new Error(result.data.message);
    }

    // Update auth user
    yield put({ type: authActionTypes.AUTH_USER_FETCH });

    if (action.userName) {
      // Fetch user data
      yield put(actions.fetchUserData(action.userName, false));
    }

    // Toster notification
    notify("success", "User unfollowed successfully.");

    // // Call fetch success to set loading false
    // yield put(actions.userSuccess());
  } catch (err) {
    console.log(err);

    // Toster notification
    notify("error", err?.response?.data.message);

    // Call fetch faild to store error message in state
    yield put(actions.userFaild(err?.response?.data));
  }
}

// Fetch user function
export function* fetchUserSaga(action) {
  try {
    if (action.showLoading) {
      // Call fetch start to displaying loading spinner
      yield put(actions.userStart());
    }

    // Call login axios function
    const result = yield fetchUserData(action.userName);

    // If response error found throw error
    if (result.data && result.data.statusCode === 400) {
      throw new Error(result.data.message);
    }

    // Store user data into redux store
    yield put(actions.userDataFetched(result.data));

    if (action.showLoading) {
      // Call fetch success to set loading false
      yield put(actions.userSuccess());
    }
  } catch (err) {
    console.log(err);

    // Toster notification
    notify("error", err?.response?.data?.message);

    // Call fetch faild to store error message in state
    yield put(actions.userFaild(err?.response?.data));
  }
}

// Upload profile image function
export function* uploadProfileImageSaga(action) {
  try {
    // Call fetch start to displaying loading spinner
    yield put(actions.userProfileUploadStart());

    // Call profile image upload axios function
    const result = yield uploadProfileImage(action.payload);

    // If response error found throw error
    if (result.data && result.data.statusCode === 400) {
      throw new Error(result.data.message);
    }

    // Get user's updated data
    const { data } = yield getUser(action.userId);

    // Update auth user's data
    yield put(authActions.updateAuthUser(data));

    // Toster notification
    notify("success", "Profile image uploaded successfully!");

    // Call fetch success to set loading false
    yield put(actions.userProfileUploadSuccess());
  } catch (err) {
    console.log(err);

    // Toster notification
    notify("error", err?.response?.data?.message);

    // Call fetch faild to store error message in state
    yield put(actions.userProfileUploadFaild(err?.response?.data));
  }
}

// Delete profile image function
export function* deleteProfileImageSaga(action) {
  try {
    // Call fetch start to displaying loading spinner
    yield put(actions.userProfileUploadStart());

    // Call profile image upload axios function
    const result = yield deleteProfileImage();

    // If response error found throw error
    if (result.data && result.data.statusCode === 400) {
      throw new Error(result.data.message);
    }

    // Toster notification
    notify("success", "Profile image removed successfully!");

    // Call fetch success to set loading false
    yield put(actions.userProfileUploadSuccess());
  } catch (err) {
    console.log(err);

    // Toster notification
    notify("error", err?.response?.data?.message);

    // Call fetch faild to store error message in state
    yield put(actions.userProfileUploadFaild(err?.response?.data));
  }
}

// Search global user
export function* searchUserGlobalSaga(action) {
  try {
    // Call fetch start to displaying loading spinner
    yield put({ type: actionTypes.USER_SEARCH_START });

    // Call search user axios function
    const result = yield searchUser(
      action.page,
      action.limit,
      action.searchInput
    );

    // If response error found throw error
    if (result.data && result.data.statusCode === 400) {
      throw new Error(result.data.message);
    }

    // Call fetch success to set loading false
    yield put({
      type: actionTypes.USER_SEARCH_SUCCESS,
      users: result.data || [],
    });
  } catch (err) {
    console.log(err);

    // Toster notification
    notify("error", err?.response?.data?.message);
  }
}
