import { isEmpty } from "lodash";
import { connect } from "react-redux";
import { useMemo, useRef } from "react";
import { Form } from "react-final-form";

import { yupValidator } from "../../../utils/general";
import FormInput from "../../../components/Form/Input";
import HomeLayout from "../../../components/layout/Home";
import { profileSchema } from "../../../validation/schema";

const EditProfile = (props) => {
  const { user } = props;
  const inputRef = useRef(null);

  const buttonClickHandler = () => {
    inputRef.current.click();
  };

  const fileChangeHandler = (e) => {
    console.log(e.target.file);
    inputRef.current.value = "";
  };

  const onSubmit = async (values) => {
    try {
      console.log("values", values);
    } catch (err) {
      console.log("err", err);
    }
  };

  const defaultValues = useMemo(() => {
    if (!user || isEmpty(user)) return {};

    return {
      email: user.email,
      bio: user.bio || "",
      userName: user.userName,
      fullName: user.fullName,
      website: user.website || "",
    };
  }, [user]);

  return (
    <HomeLayout>
      <div className="user-info-container">
        <div className="user-info">
          <div className="profile-image">
            <button onClick={buttonClickHandler}>
              <img alt="user-img" src="/user-img.jpg" />
            </button>
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
            initialValues={{
              email: user.email,
              bio: user.bio || "",
              userName: user.userName,
              fullName: user.fullName,
              website: user.website || "",
            }}
            validate={(values) => yupValidator(values, profileSchema)}
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
                    <FormInput name="email" placeHolder="Email address" />
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
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    login: (values) => dispatch(authActions.login(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
