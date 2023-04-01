import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  getPostsSaga,
  postLikeSaga,
  createPostSaga,
  deletePostSaga,
  postUnlikeSaga,
  getSinglePostSaga,
} from "./saga";

// Watch auth function generator
export function* watchPost() {
  yield all([
    // takeEvery call every functions that matches
    takeEvery(actionTypes.POST_LIKE, postLikeSaga),
    takeEvery(actionTypes.POSTS_FETCH, getPostsSaga),
    takeEvery(actionTypes.POST_DELETE, deletePostSaga),
    takeEvery(actionTypes.POST_CREATE, createPostSaga),
    takeEvery(actionTypes.POST_UNLIKE, postUnlikeSaga),
    takeEvery(actionTypes.POST_FETCH, getSinglePostSaga),
  ]);
}
