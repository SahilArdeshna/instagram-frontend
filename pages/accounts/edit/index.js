import { connect } from "react-redux";
import { Form } from "react-final-form";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";

import Loader from "../../../icons/Loader";
import Loading from "../../../components/loading";
import { yupValidator } from "../../../utils/general";
import FormInput from "../../../components/Form/Input";
import HomeLayout from "../../../components/layout/Home";
import { profileSchema } from "../../../validation/schema";
import * as userActions from "../../../store/user/actions";
import * as modalActions from "../../../store/modal/actions";

const EditProfile = (props) => {
  const inputRef = useRef(null);
  const { isReady, push, replace } = useRouter();
  const {
    user,
    error,
    isAuth,
    loading,
    openModal,
    updateUser,
    isUpdating,
    uploadProfile,
    isUploadProfile,
    isImageProcessing,
  } = props;

  const buttonClickHandler = useCallback(() => {
    if (user?.profileImage?.url) {
      openModal();
      return;
    }

    inputRef.current.click();
  }, [user]);

  let profileImage = "/user-img.jpg";
  if (user?.profileImage?.url) {
    profileImage = user.profileImage.url;
  }

  const fileChangeHandler = (e) => {
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

  const onSubmit = (values) => updateUser(values);

  if (error && error.statusCode === 401) {
    // Logout from web-app
    props.logout();

    // Redirect to login page
    replace("/accounts/login");
  }

  useEffect(() => {
    if (!isUploadProfile) return;

    inputRef.current.click();
  }, [isUploadProfile]);

  if (!isAuth) {
    push("/accounts/login");
    return <Loading />;
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
                    <FormInput name="fullName" placeholder="Name" />
                  </div>
                </div>
                <div className="form-div">
                  <div className="label-div">
                    <label>Username</label>
                  </div>
                  <div className="input-div">
                    <FormInput
                      disabled
                      name="userName"
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div className="form-div">
                  <div className="label-div">
                    <label>Website</label>
                  </div>
                  <div className="input-div">
                    <FormInput name="website" placeholder="Website" />
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
                      placeholder=""
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
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div className="form-div">
                  <div className="label-div">
                    <label></label>
                  </div>
                  <div className="button-div">
                    <button
                      type="submit"
                      disabled={submitting || pristine || isUpdating}
                    >
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
    isUpdating: state.user.isUpdating,
    isImageProcessing: state.user.isImageProcessing,
    isUploadProfile: state.modal.profileUploadModal.uploadProfile,
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(modalActions.openProfileUploadModal()),
    uploadProfile: (payload, userId) =>
      dispatch(userActions.userProfileImageUpload(payload, userId)),
    updateUser: (payload) => dispatch(userActions.updateUser(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
