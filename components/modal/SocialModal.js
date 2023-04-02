import { isEmpty } from "lodash";
import { Modal, Container, Row } from "react-bootstrap";

import CloseIcon from "../../icons/CloseIcon";
import UserInfo from "../../widgets/UserInfo";

function SocialModal({
  authUser,
  showModal,
  users = [],
  followUser,
  closeModal,
  unfollowUser,
}) {
  return (
    <Modal centered onHide={closeModal} show={showModal.show}>
      <Modal.Body>
        <Container>
          <Row className="social-modal-header">
            <div>{showModal.type}</div>
            <button>
              <CloseIcon />
            </button>
          </Row>
          <Row className="social-modal-content">
            {!isEmpty(users) ? (
              <div className="users-list">
                {users.map((user) => (
                  <div key={user?._id} className="user-info">
                    <UserInfo
                      width="44"
                      height="44"
                      global={true}
                      fullName={user?.fullName}
                      userName={user?.userName}
                      profileImage={user?.profileImage?.url}
                    />
                    <div className="social-relation">
                      {(authUser?.following || []).includes(user?._id) ? (
                        <button
                          className="following-profile"
                          onClick={() => unfollowUser(user?._id)}
                        >
                          Following
                        </button>
                      ) : (
                        <button
                          className="follow-profile"
                          onClick={() => followUser(user?._id)}
                        >
                          {(authUser?.followers || []).includes(user?._id)
                            ? "Follow Back"
                            : "Follow"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No user data!</div>
            )}
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default SocialModal;
