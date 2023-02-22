import { isEmpty } from "lodash";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Modal, Container } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { useCallback, useMemo, useRef, useState } from "react";

import Loading from "../loading";
import File from "../../icons/File";
import BackArrow from "../../icons/BackArrow";
import UserInfoShort from "../../widgets/UserInfoShort";
import * as postActions from "../../store/posts/actions";
import * as modalActions from "../../store/modal/actions";

function PostUpload(props) {
  const inputRef = useRef(null);
  const {
    user,
    files,
    closeModal,
    createPost,
    updateFiles,
    isUploading,
    showCreateModal,
  } = props;

  const [caption, setCaption] = useState("");

  const shareClickHandler = useCallback(() => {
    if (isEmpty(files)) {
      toast.error("Please upload images or videos");
      return;
    }

    const formData = new FormData();
    formData.append("images", files);
    formData.append("detail", caption);

    createPost(formData);
  }, [files, caption]);

  const shareButton = useMemo(() => {
    if (isUploading) {
      return <Loading width={25} height={25} />;
    }

    return (
      <button className="share" onClick={shareClickHandler}>
        Share
      </button>
    );
  }, [isUploading, shareClickHandler]);

  const onButtonClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const inputChangeHandler = (e) => {
    const files = e.target.files;
    if (isEmpty(files)) return;

    // File size limitation

    updateFiles([...files]);
    inputRef.current.value = "";
  };

  const backClickHandler = () => {};

  const captionChangeHandler = (e) => setCaption(e.target.value);

  return (
    <Modal centered onHide={closeModal} show={showCreateModal}>
      <Modal.Body>
        <Container>
          <div className="post-modal">
            <div className="post-modal-title">
              {!isEmpty(files) && (
                <button className="back-arrow" onClick={backClickHandler}>
                  <BackArrow />
                </button>
              )}
              <h1>Create new post</h1>
              {!isEmpty(files) && shareButton}
            </div>
            {!isEmpty(files) ? (
              <div className="post-modal-content-upload">
                <div className="preview-image">
                  <Carousel
                    showArrows={true}
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                  >
                    {files.map((file, index) => (
                      <div key={`${file.name}-${index}`}>
                        <img alt={file.name} src={URL.createObjectURL(file)} />
                      </div>
                    ))}
                  </Carousel>
                </div>
                <div className="post-info">
                  <UserInfoShort
                    username={user.userName}
                    profileImage={user.profileImage}
                  />
                  <div>
                    <textarea
                      onChange={captionChangeHandler}
                      placeholder="Write a caption..."
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="post-modal-content">
                <File />
                <span>Upload photos and videos here</span>
                <div>
                  <input
                    multiple
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
    isUploading: state.post.isUploading,
    files: state.modal.createModal.files,
    showCreateModal: state.modal.createModal.show,
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(modalActions.closeCreateModal()),
    createPost: (data) => dispatch(postActions.createPost(data)),
    updateFiles: (files) => dispatch(modalActions.updateFiles(files)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostUpload);
