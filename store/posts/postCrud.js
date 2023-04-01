import axios from "../../utils/axios";

// Api
const POST_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}/posts`;

// Create post function
export const createPost = async (payload) => {
  return await axios.post(POST_URL, payload, {
    headers: { "Content-type": "multipart/form-data" },
  });
};

// Get posts function
export const getPosts = async () => {
  return await axios.get(POST_URL);
};

// Get single post function
export const getSinglePost = async (postId) => {
  return await axios.get(`${POST_URL}/${postId}`);
};

// Delete post function
export const deletePost = async (postId) => {
  return await axios.delete(`${POST_URL}/${postId}`);
};

// Post like function
export const postLike = async (postId) => {
  return await axios.put(`${POST_URL}/${postId}/like`);
};

// Post unlike function
export const postUnlike = async (postId) => {
  return await axios.put(`${POST_URL}/${postId}/unlike`);
};
