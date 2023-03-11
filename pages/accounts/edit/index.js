import { isEmpty } from "lodash";
import { connect } from "react-redux";
import { useMemo, useRef } from "react";
import { Form } from "react-final-form";
import { useRouter } from "next/router";

import Loader from "../../../icons/Loader";
import Loading from "../../../components/loading";
import { yupValidator } from "../../../utils/general";
import FormInput from "../../../components/Form/Input";
import HomeLayout from "../../../components/layout/Home";
import { profileSchema } from "../../../validation/schema";
import * as userActions from "../../../store/user/actions";

const EditProfile = (props) => {
  const inputRef = useRef(null);
  const { isReady, push, replace } = useRouter();
  const {
    user,
    error,
    isAuth,
    loading,
    uploadProfile,
    removeProfile,
    isImageProcessing,
  } = props;

  if (!isAuth) {
    push("/accounts/login");
    return <Loading />;
  }

  let profileImage = "/user-img.jpg";
  if (user?.profileImage?.url) {
    profileImage = user.profileImage.url;
  }

  const buttonClickHandler = () => {
    inputRef.current.click();
  };

  const fileChangeHandler = (e) => {
    console.log(e.target.files);
    const file = e.target?.files[0];

    if (!file) {
      toast.error("Please upload images!");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    uploadProfile(formData, user._id);
    inputRef.current.value = "";
  };

  const onSubmit = async (values) => {
    try {
      console.log("values", values);
    } catch (err) {
      console.log("err", err);
    }
  };

  if (error && error.statusCode === 401) {
    // Logout from web-app
    props.logout();

    // Redirect to login page
    replace("/accounts/login");
  }

  if (loading || !isReady) {
    return <Loading />;
  }

  return (
    <HomeLayout>
      <div className="user-info-container">
        <div className="user-info">
          <div className="profile-image">
            <button onClick={buttonClickHandler}>
              <img alt="user-img" src={profileImage} />
            </button>
            {isImageProcessing && (
              <div className="profile-loader">
                <Loader />
              </div>
            )}
            <input type="file" ref={inputRef} onChange={fileChangeHandler} />
          </div>
          <div className="username-container">
            <div className="username">{user.userName}</div>
            <div className="profile-change" onClick={buttonClickHandler}>
              Change profile photo
            </div>
          </div>
        </div>
        <div className="form-container">
          <Form
            onSubmit={onSubmit}
            validate={(values) => yupValidator(values, profileSchema)}
            initialValues={{
              email: user.email,
              bio: user.bio || "",
              userName: user.userName,
              fullName: user.fullName,
              website: user.website || "",
            }}
          >
            {({ handleSubmit, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-div">
                  <div className="label-div">
                    <label>Name</label>
                  </div>
                  <div className="input-div">
                    <FormInput name="fullName" placeHolder="Name" />
                  </div>
                </div>
                <div className="form-div">
                  <div className="label-div">
                    <label>Username</label>
                  </div>
                  <div className="input-div">
                    <FormInput name="userName" placeHolder="Username" />
                  </div>
                </div>
                <div className="form-div">
                  <div className="label-div">
                    <label>Website</label>
                  </div>
                  <div className="input-div">
                    <FormInput name="website" placeHolder="Website" />
                  </div>
                </div>
                <div className="form-div">
                  <div className="label-div">
                    <label>Bio</label>
                  </div>
                  <div className="input-div">
                    <FormInput
                      as="textarea"
                      rows={3}
                      name="bio"
                      placeHolder=""
                    />
                  </div>
                </div>
                <div className="form-div">
                  <div className="label-div">
                    <label>Email address</label>
                  </div>
                  <div className="input-div">
                    <FormInput
                      disabled
                      name="email"
                      placeHolder="Email address"
                    />
                  </div>
                </div>
                <div className="form-div">
                  <div className="label-div">
                    <label></label>
                  </div>
                  <div className="button-div">
                    <button type="submit" disabled={submitting || pristine}>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Form>
        </div>
      </div>
    </HomeLayout>
  );
};

// Map state to props
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuth: state.auth.isAuth,
    loading: state.auth.loading,
    isImageProcessing: state.user.isImageProcessing,
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    removeProfile: () => dispatch(userActions.userProfileImageDelete()),
    uploadProfile: (payload, userId) =>
      dispatch(userActions.userProfileImageUpload(payload, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
