import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  getPostsSaga,
  createPostSaga,
  deletePostSaga,
  getSinglePostSaga,
} from "./saga";

// Watch auth function generator
export function* watchPost() {
  yield all([
    // takeEvery call every functions that matches
    takeEvery(actionTypes.POSTS_FETCH, getPostsSaga),
    takeEvery(actionTypes.POST_DELETE, deletePostSaga),
    takeEvery(actionTypes.POST_CREATE, createPostSaga),
    takeEvery(actionTypes.POST_FETCH, getSinglePostSaga),
  ]);
}
