import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";

import ActionButton from "../button/ActionButton";
import * as postActions from "../../store/posts/actions";
import * as modalActions from "../../store/modal/actions";
import SocialContainer from "../../widgets/SocialContainer";

function Posts(props) {
  const { posts, user, postLike, postUnlike, openModal } = props;

  // Action click handler function
  const actionClickHandler = (e, post) => {
    e.preventDefault();

    const postId = post._id;
    const author = post.author;
    const isFollowing = post.isFollowing;

    // Open action modal
    openModal(author, postId, isFollowing);
  };

  const likeClickHandler = (postId) => {
    postLike(postId);
  };

  const unlikeClickHandler = (postId) => {
    postUnlike(postId);
  };

  let postsRender;
  postsRender = posts.map((post) => {
    let profileImage = "/user-img.jpg";
    const isLiked = (post?.likes || []).includes(user._id);

    if (post.author?.profileImage?.url) {
      profileImage = post.author.profileImage.url;
    }

    return (
      <div key={post._id} className="post-article">
        <header className="post-header">
          <div className="profile-image-div">
            <div className="image-div">
              <Link href={`/${post.author?.userName}`}>
                <img
                  alt="profile-pic"
                  src={profileImage}
                  width="32px"
                  height="32px"
                />
              </Link>
            </div>
          </div>
          <div className="username-div">
            <div className="username">
              <div className="name">
                <Link href={`/${post.author?.userName}`}>
                  <span className="name-span">
                    {post.author?.userName || ""}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <ActionButton post={post} buttonClick={actionClickHandler} />
        <div className="post-media">
          <div>
            <div className="media-container">
              <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
              >
                {post.images.map((image) => (
                  <div>
                    <img alt={image.key} src={image.url} />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
        <SocialContainer
          isLiked={isLiked}
          postId={post._id}
          likes={post.likes}
          likeClickHandler={likeClickHandler}
          unlikeClickHandler={unlikeClickHandler}
        />
        <div className="post-detail">
          <div className="detail-container">
            <div className="detail-div">
              <div className="info-div">
                <div className="container-div">
                  <Link href={`/${post.author?.userName}`}>
                    <span className="username-span">
                      {post.author?.userName || ""}
                    </span>
                  </Link>{" "}
                  <span className="detail-span">{post.detail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="posts">
      <div className="posts-div">{postsRender}</div>
    </div>
  );
}

// Map state to props
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    posts: state.post.posts,
    isAuth: state.auth.isAuth,
    loading: state.post.loading,
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    postLike: (postId) => dispatch(postActions.postLike(postId)),
    postUnlike: (postId) => dispatch(postActions.postUnlike(postId)),
    openModal: (author, postId, isFollowing) =>
      dispatch(modalActions.openActionModal(author, postId, isFollowing)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
