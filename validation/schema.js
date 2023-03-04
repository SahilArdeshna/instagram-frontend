import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required!"),
  password: yup.string().required("Password is required!"),
});

export const profileSchema = yup.object().shape({
  fullName: yup.string().required("Name is required!"),
  userName: yup.string().required("Username is required!"),
  email: yup.string().email().required("Email address is required!"),
});
