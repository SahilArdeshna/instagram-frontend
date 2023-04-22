import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  fetchUserSaga,
  userFollowSaga,
  updateUserSaga,
  socialStatsSaga,
  userUnfollowSaga,
  searchUserGlobalSaga,
  uploadProfileImageSaga,
  deleteProfileImageSaga,
} from "./saga";

// Watch auth function generator
export function* watchUser() {
  yield all([
    // takeEvery call every functions that matches
    takeEvery(actionTypes.USER_FETCH, fetchUserSaga),
    takeEvery(actionTypes.USER_UPDATE, updateUserSaga),
    takeEvery(actionTypes.USER_FOLLOW, userFollowSaga),
    takeEvery(actionTypes.USER_UNFOLLOW, userUnfollowSaga),
    takeEvery(actionTypes.USER_SEARCH, searchUserGlobalSaga),
    takeEvery(actionTypes.USER_SOCIAL_STATS, socialStatsSaga),
    takeEvery(actionTypes.USER_PROFILE_IMAGE_UPLOAD, uploadProfileImageSaga),
    takeEvery(actionTypes.USER_PROFILE_IMAGE_DELETE, deleteProfileImageSaga),
  ]);
}
