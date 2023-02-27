import { connect } from "react-redux";

const EditProfile = () => {
  return <div>Edit Profile</div>;
};

// Map state to props
const mapStateToProps = (state) => {
  return {
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
