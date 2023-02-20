import { useRef } from "react";
import { connect } from "react-redux";
import { Modal, Container, Row } from "react-bootstrap";

import File from "../../icons/File";
import BackArrow from "../../icons/BackArrow";
import UserInfoShort from "../../widgets/UserInfoShort";
import * as modalActions from "../../store/modal/actions";

function PostUpload(props) {
  const inputRef = useRef(null);
  const { file, user, closeModal, updateFile, showCreateModal } = props;

  console.log("file", file);

  const onButtonClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const inputChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    updateFile(fileUrl);
    inputRef.current.value = "";
  };

  const backClickHandler = () => {};

  return (
    <Modal centered onHide={closeModal} show={showCreateModal}>
      <Modal.Body>
        <Container>
          <div className="post-modal">
            <div className="post-modal-title">
              {file && (
                <button className="back-arrow" onClick={backClickHandler}>
                  <BackArrow />
                </button>
              )}
              <h1>Create new post</h1>
              {file && <button className="share">Share</button>}
            </div>
            {file ? (
              <div className="post-modal-content-upload">
                <div className="preview-image">
                  <img src={file} alt="preview-image" />
                </div>
                <div className="post-info">
                  <UserInfoShort
                    username={user.userName}
                    profileImage={user.profileImage}
                  />
                  <div>
                    <textarea placeholder="Write a caption..." />
                  </div>
                </div>
              </div>
            ) : (
              <div className="post-modal-content">
                <File />
                <span>Upload photos and videos here</span>
                <div>
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={inputChangeHandler}
                  />
                  <button onClick={onButtonClick}>Select From Computer</button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    file: state.modal.createModal.file,
    showCreateModal: state.modal.createModal.show,
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    updateFile: (url) => dispatch(modalActions.updateFile(url)),
    closeModal: () => dispatch(modalActions.closeCreateModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostUpload);
