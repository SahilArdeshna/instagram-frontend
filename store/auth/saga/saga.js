import { put } from "redux-saga/effects";

import * as actions from "../actions";
import { me } from "../../user/userCrud";
import { login, signup } from "../authCrud";
import { notify } from "../../../utils/toster";

// Login function
export function* loginSaga(action) {
  try {
    // Call fetch start to displaying loading spinner
    yield put(actions.authStart());

    // Call login axios function
    const result = yield login({ ...action.loginData });

    // If response error found throw error
    if (result.data && result.data.statusCode === 400) {
      throw new Error(result.data.message);
    }

    // Store auth restult into store
    yield put(actions.loginSuccess(result.data));

    // Toster notification
    // notify("success", "Successfully loged in.");

    // Call fetch success to set loading false
    yield put(actions.authSuccess());
  } catch (err) {
    console.log(err);
    let errMsg =
      err?.response?.data?.message ||
      "Something went wrong! Please try again later.";

    if (Array.isArray(err?.response?.data?.message)) {
      err.response.data.message.forEach((err) => {
        // Toster notification
        notify("error", err);
      });
    } else {
      // Toster notification
      notify("error", errMsg);
    }

    // Call fetch faild to store error message in state
    yield put(actions.authFaild(errMsg));
  }
}

// Signup function
export function* signupSaga(action) {
  try {
    // Call fetch start to displaying loading spinner
    yield put(actions.authStart());

    // Call login axios function
    const result = yield signup({ ...action.signupData });

    // If response error found throw error
    if (result.data && result.data.statusCode === 400) {
      throw new Error(result.data.message);
    }

    // Toster notification
    notify("success", "Successfully signup.");

    // Call fetch success to set loading false
    yield put(actions.authSuccess());
  } catch (err) {
    console.log(err);
    let errMsg =
      err?.response?.data?.message ||
      "Something went wrong! Please try again later.";

    if (Array.isArray(err?.response?.data?.message)) {
      err.response.data.message.forEach((err) => {
        // Toster notification
        notify("error", err);
      });
    } else {
      // Toster notification
      notify("error", errMsg);
    }

    // Call fetch faild to store error message in state
    yield put(actions.authFaild(errMsg));
  }
}

// Auth user get data function
export function* meSaga(action) {
  try {
    // Call me axios function
    const result = yield me();

    // If response error found throw error
    if (result.data && result.data.statusCode === 400) {
      throw new Error(result.data.message);
    }

    // Call fetch success to set loading false
    yield put(actions.updateAuthUser(result.data));
  } catch (err) {
    console.log(err);
  }
}
