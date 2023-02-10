import axios from "../../utils/axios";

// Api
const LOGIN_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`;
const SIGNUP_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/signup`;

// Login function
export const login = async (loginData) => {
  return await axios.post(LOGIN_URL, loginData, {
    headers: { Authorization: "Bearer " },
  });
};

// Signup function
export const signup = async (signupData) => {
  return await axios.post(SIGNUP_URL, signupData, {
    headers: { Authorization: "Bearer " },
  });
};
