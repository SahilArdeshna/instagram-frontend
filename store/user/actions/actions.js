import * as actionTypes from "./actionTypes";

// User start
export const userStart = () => {
  return {
    type: actionTypes.USER_START,
  };
};

// User faild
export const userFaild = (error) => {
  return {
    type: actionTypes.USER_FAILD,
    error,
  };
};

// User success
export const userSuccess = () => {
  return {
    type: actionTypes.USER_SUCCESS,
  };
};

// Follow
export const follow = (followId) => {
  return {
    type: actionTypes.USER_FOLLOW,
    followId,
  };
};

// Unfollow
export const unfollow = (unfollowId) => {
  return {
    type: actionTypes.USER_UNFOLLOW,
    unfollowId,
  };
};

// Fetch user data
export const fetchUserData = (userName) => {
  return {
    type: actionTypes.USER_FETCH,
    userName,
  };
};

// User data fetched
export const userDataFetched = (data) => {
  return {
    type: actionTypes.USER_FETCHED,
    user: data.user,
    posts: data.posts,
  };
};

// Init state
export const userInit = () => {
  return {
    type: actionTypes.USER_INIT,
  };
};

// Upload profile image
export const userProfileImageUpload = (payload, userId) => {
  return {
    type: actionTypes.USER_PROFILE_IMAGE_UPLOAD,
    payload,
    userId,
  };
};

// Delete profile image
export const userProfileImageDelete = () => {
  return {
    type: actionTypes.USER_PROFILE_IMAGE_DELETE,
  };
};

// User profile upload start
export const userProfileUploadStart = () => {
  return {
    type: actionTypes.USER_PROFILE_IMAGE_START,
  };
};

// User profile upload failed
export const userProfileUploadFaild = () => {
  return {
    type: actionTypes.USER_PROFILE_IMAGE_FAILD,
  };
};

// User profile upload success
export const userProfileUploadSuccess = () => {
  return {
    type: actionTypes.USER_PROFILE_IMAGE_SUCCESS,
  };
};

// Search user
export const searchUserGlobal = (page, limit, searchInput) => {
  return {
    type: actionTypes.USER_SEARCH,
    page,
    limit,
    searchInput,
  };
};
