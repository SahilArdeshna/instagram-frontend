import { useMemo } from "react";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import { Modal, Container, Row } from "react-bootstrap";

import Loader from "../../icons/Loader";
import CloseIcon from "../../icons/CloseIcon";
import UserInfo from "../../widgets/UserInfo";
import * as userActions from "../../store/user/actions";
import * as modalActions from "../../store/modal/actions";

function SocialModal(props) {
  const {
    authUser,
    viewUser,
    closeModal,
    followUser,
    socialStats,
    unfollowUser,
    socialLoader,
    openUnfollowModal,
  } = props;
  const { show, userId, actionType, followers, following } = socialStats;

  const socialData = useMemo(() => {
    return actionType === "followers" ? followers : following;
  }, [actionType, userId, followers, following]);

  return (
    <Modal centered onHide={closeModal} show={show}>
      <Modal.Body>
        <Container>
          <Row className="social-modal-header">
            <h1 className="text">
              {actionType === "followers" ? "Followers" : "Following"}
            </h1>
            <div className="close-button">
              <button onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>
          </Row>
          <Row className="social-modal-content">
            {!isEmpty(socialData) ? (
              <div className="users-list">
                {socialData.map((user) => {
                  const isFollowing = (authUser?.following || []).includes(
                    user?._id
                  );
                  const isFollower = (authUser?.followers || []).includes(
                    user?._id
                  );
                  const isAuthUser = authUser?._id === user?._id;

                  return (
                    <div key={user?._id} className="user-info">
                      <UserInfo
                        width="44"
                        height="44"
                        global={true}
                        onClick={closeModal}
                        fullName={user?.fullName}
                        userName={user?.userName}
                        profileImage={user?.profileImage?.url}
                      />
                      <div className="social-relation">
                        {isFollowing && !isAuthUser ? (
                          <button
                            disabled={socialLoader}
                            className="following-profile"
                            onClick={() => openUnfollowModal(user)}
                          >
                            {socialLoader ? (
                              <div className="profile-loader">
                                <Loader />
                              </div>
                            ) : (
                              "Following"
                            )}
                          </button>
                        ) : isFollower && !isAuthUser ? (
                          <button
                            disabled={socialLoader}
                            className="follow-profile"
                            onClick={() =>
                              followUser(
                                user?._id,
                                viewUser?.userName === authUser?.userName
                                  ? viewUser.userName
                                  : ""
                              )
                            }
                          >
                            {socialLoader ? (
                              <div className="profile-loader">
                                <Loader />
                              </div>
                            ) : (authUser?.followers || []).includes(
                                user?._id
                              ) ? (
                              "Follow Back"
                            ) : (
                              "Follow"
                            )}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: "10px" }}>No user data!</div>
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
    viewUser: state.user.user,
    socialStats: state.modal.socialStats,
    socialLoader: state.user.socialLoader,
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    followUser: (userId) => dispatch(userActions.follow(userId)),
    unfollowUser: (userId) => dispatch(userActions.unfollow(userId)),
    closeModal: () => dispatch(modalActions.closeSocialStatsModal()),
    openUnfollowModal: (user) => dispatch(modalActions.openUnfollowModal(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialModal);
