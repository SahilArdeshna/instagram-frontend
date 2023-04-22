import { connect } from "react-redux";
import { Modal, Container, Row } from "react-bootstrap";

import * as userActions from "../../store/user/actions";
import * as modalActions from "../../store/modal/actions";

function ProfileUpload(props) {
  const { user, show, closeModal, removeProfile, updateProfileUploadState } =
    props;

  const updateProfileImageState = () => {
    updateProfileUploadState();
    setTimeout(() => {
      closeModal();
    }, 1000);
  };

  const removeProfileImage = () => {
    removeProfile(user?._id);
    closeModal();
  };

  return (
    <Modal centered show={show} onHide={closeModal}>
      <Modal.Body>
        <Container className="profile-upload-modal">
          <Row>
            <div className="change-profile-photo">Change Profile Photo</div>
          </Row>
          <hr />
          <Row onClick={updateProfileImageState}>
            <div className="upload-photo">Upload Photo</div>
          </Row>
          <hr />
          <Row onClick={removeProfileImage}>
            <div className="remove-photo">Remove Current Photo</div>
          </Row>
          <hr />
          <Row onClick={closeModal}>
            <div className="cancel">Cancel</div>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    show: state.modal.profileUploadModal.show,
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(modalActions.closeProfileUploadModal()),
    removeProfile: (userId) =>
      dispatch(userActions.userProfileImageDelete(userId)),
    updateProfileUploadState: () =>
      dispatch(modalActions.updateProfileUploadState(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpload);
