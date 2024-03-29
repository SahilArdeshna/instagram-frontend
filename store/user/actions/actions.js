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
export const follow = (followId, userName) => {
  return {
    type: actionTypes.USER_FOLLOW,
    followId,
    userName,
  };
};

// Unfollow
export const unfollow = (unfollowId, userName) => {
  return {
    type: actionTypes.USER_UNFOLLOW,
    unfollowId,
    userName,
  };
};

// Fetch user data
export const fetchUserData = (userName, showLoading = true) => {
  return {
    type: actionTypes.USER_FETCH,
    userName,
    showLoading,
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
export const userProfileImageDelete = (userId) => {
  return {
    type: actionTypes.USER_PROFILE_IMAGE_DELETE,
    userId,
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

// Social stats
export const socialStats = (userId, type) => {
  return {
    type: actionTypes.USER_SOCIAL_STATS,
    userId,
    actionType: type,
  };
};

// User update
export const updateUser = (payload) => {
  return {
    type: actionTypes.USER_UPDATE,
    payload,
  };
};
