import axios from "../../utils/axios";

// Api
const USER_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}/users`;

// User follow function
export const follow = async (followId) => {
  return await axios.get(`${USER_URL}/${followId}/follow`);
};

// User unfollow function
export const unfollow = async (unfollowId) => {
  return await axios.get(`${USER_URL}/${unfollowId}/unfollow`);
};

// Fetch user data function
export const fetchUserData = async (userName) => {
  return await axios.get(`${USER_URL}/${userName}/posts`);
};

// Upload profile image
export const uploadProfileImage = async (payload) => {
  return await axios.post(`${USER_URL}/uploadImage`, payload, {
    headers: { "Content-type": "multipart/form-data" },
  });
};

// Delete profile image
export const deleteProfileImage = async () => {
  return await axios.delete(`${USER_URL}/delete`);
};

// Get user data
export const getUser = async (userId) => {
  return await axios.get(`${USER_URL}/${userId}`);
};

// Search user
export const searchUser = async (page, limit, searchInput) => {
  return await axios.get(
    `${USER_URL}?search=${searchInput}&page=${page}&limit=${limit}`
  );
};
