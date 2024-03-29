import { put } from "redux-saga/effects";

import * as actions from "../actions";
import { notify } from "../../../utils/toster";
import * as modalActions from "../../modal/actions";
import * as actionTypes from "../actions/actionTypes";
import {
  getPosts,
  postLike,
  postUnlike,
  deletePost,
  createPost,
  getSinglePost,
} from "../postCrud";

// Create post function
export function* createPostSaga(action) {
  try {
    // Call fetch start to displaying loading spinner
    yield put(actions.updateCreatePostLoading(true));

    // Call login axios function
    const result = yield createPost(action.data);

    // If response error found throw error
    if (result.data && result.data.statusCode === 400) {
      throw new Error(result.data.message);
    }

    // Toster notification
    notify("success", "Post created successfully.");

    // Fetch all posts
    yield put(actions.fetchPosts());

    // Close create modal form
    yield put(modalActions.closeCreateModal());

    // Call fetch success to set loading false
    yield put(actions.updateCreatePostLoading(false));
  } catch (err) {
    console.log(err);

    // Toster notification
    notify("error", err.response.data.message);

    // Call fetch faild to store error message in state
    yield put(actions.updateCreatePostLoading(false));
  }
}

// Get Posts function
export function* getPostsSaga(action) {
  try {
    // Call fetch start to displaying loading spinner
    yield put(actions.postStart());

    // Call login axios function
    const result = yield getPosts();

    // If response error found throw error
    if (result.data && result.data.statusCode === 400) {
      throw new Error(result.data.message);
    }

    // Store post data into store
    yield put(actions.postsFetched(result.data));

    // Call fetch success to set loading false
    yield put(actions.postSuccess());
  } catch (err) {
    console.log(err);

    // Toster notification
    notify("error", err.response.data.message);

    // Call fetch faild to store error message in state
    yield put(actions.postFaild(err.response.data));
  }
}

// Get Single Post function
export function* getSinglePostSaga(action) {
  try {
    // Call fetch start to displaying loading spinner
    yield put(actions.postStart());

    // Call login axios function
    const result = yield getSinglePost(action.id);

    // If response error found throw error
    if (result.data && result.data.statusCode === 400) {
      throw new Error(result.data.message);
    }

    // Store post data into store
    yield put(actions.siglePostFetched(result.data));

    // Call fetch success to set loading false
    yield put(actions.postSuccess());
  } catch (err) {
    console.log(err);

    // Toster notification
    notify("error", err.response.data.message);

    // Call fetch faild to store error message in state
    yield put(actions.postFaild(err.response.data));
  }
}

// Delete Post function
export function* deletePostSaga(action) {
  try {
    // Call fetch start to displaying loading spinner
    yield put(actions.postStart());

    // Call login axios function
    const result = yield deletePost(action.id);

    // If response error found throw error
    if (result?.data && result?.data?.statusCode === 400) {
      throw new Error(result?.data?.message);
    }

    // Store post data into store
    yield put(actions.fetchPosts());

    // Toster notification
    notify("success", "Post deleted successfully.");

    // Call fetch success to set loading false
    yield put(actions.postSuccess());
  } catch (err) {
    console.log(err);

    // Toster notification
    notify("error", err?.response?.data?.message);

    // Call fetch faild to store error message in state
    yield put(actions.postFaild(err.response.data));
  }
}

// Like post saga function
export function* postLikeSaga(action) {
  try {
    // Call post like axios function
    const result = yield postLike(action.postId);

    // If response error found throw error
    if (result?.data && result?.data?.statusCode === 400) {
      throw new Error(result?.data?.message);
    }

    // Update post data
    if (action.updatePost) {
      yield put({ type: actionTypes.POST_FETCHED, post: result.data.post });
    } else {
      // Store post data into store
      yield put(actions.fetchPosts());
    }
  } catch (error) {
    console.log(err);

    // Toster notification
    notify("error", err?.response?.data?.message);
  }
}

// Unlike post saga function
export function* postUnlikeSaga(action) {
  try {
    // Call post unlike axios function
    const result = yield postUnlike(action.postId);

    // If response error found throw error
    if (result?.data && result?.data?.statusCode === 400) {
      throw new Error(result?.data?.message);
    }

    // Update post data
    if (action.updatePost) {
      yield put({ type: actionTypes.POST_FETCHED, post: result.data.post });
    } else {
      // Store post data into store
      yield put(actions.fetchPosts());
    }
  } catch (error) {
    console.log(err);

    // Toster notification
    notify("error", err?.response?.data?.message);
  }
}
