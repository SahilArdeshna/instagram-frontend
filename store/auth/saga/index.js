import { takeEvery, all } from "redux-saga/effects";

import { loginSaga, signupSaga } from "./saga";
import * as actionTypes from "../actions/actionTypes";

// Watch auth function generator
export function* watchAuth() {
  yield all([
    // takeEvery call every functions that matches
    takeEvery(actionTypes.AUTH_LOGIN, loginSaga),
    takeEvery(actionTypes.AUTH_SIGNUP, signupSaga),
  ]);
}
