import { isEmpty } from "lodash";
import { connect } from "react-redux";
import { Modal, Container, Row } from "react-bootstrap";

import CloseIcon from "../../icons/CloseIcon";
import UserInfo from "../../widgets/UserInfo";
import * as userAction from "../../store/user/actions";

function SocialModal(props) {
  const { authUser, socialStats, getSocialStats } = props;
  const { userId, isLoading } = socialStats;

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

const mapStateToProps = (state) => {
  return {
    authUser: state.auth.user,
    socialStats: state.user.socialStats,
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    getSocialStats: (userId, type) =>
      dispatch(userAction.socialStats(userId, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialModal);
