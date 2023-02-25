import { connect } from "react-redux";
import { Modal, Container, Row } from "react-bootstrap";

import * as modalActions from "../../store/modal/actions";

function DiscardModal(props) {
  const {
    exit,
    closeModal,
    updateExit,
    updateFiles,
    updateDiscard,
    showDiscardModal,
  } = props;

  const modalCloseHandler = () => {
    updateDiscard(false);
  };

  const discardClickHandler = () => {
    if (exit) {
      closeModal();
      updateExit(false);
    }

    updateFiles([]);
    updateDiscard(false);
  };

  return (
    <Modal centered show={showDiscardModal} onHide={modalCloseHandler}>
      <Modal.Body>
        <Container>
          <Row className="no-cursor">
            <div className="discard-content">
              <div>Discard post?</div>
              <span>If you leave, your edits won't be saved.</span>
            </div>
          </Row>
          <hr />
          <Row onClick={discardClickHandler}>
            <div className="discard">Discard</div>
          </Row>
          <hr />
          <Row onClick={closeModal}>
            <div>Cancel</div>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    exit: state.modal.createModal.exit,
    showDiscardModal: state.modal.createModal.discard,
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(modalActions.closeCreateModal()),
    updateExit: (exit) => dispatch(modalActions.updateExit(exit)),
    updateFiles: (value) => dispatch(modalActions.updateFiles(value)),
    updateDiscard: (value) => dispatch(modalActions.updateDiscard(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscardModal);
