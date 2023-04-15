import moment from "moment";

import LikeIcon from "../icons/LikeIcon";
import UnlikeIcon from "../icons/UnlikeIcon";

const SocialContainer = ({
  postId,
  isLiked,
  timestamp,
  likes = [],
  likeClickHandler,
  unlikeClickHandler,
}) => {
  return (
    <div className="social-container">
      <div className="social-icon">
        {isLiked ? (
          <span className="social" onClick={() => unlikeClickHandler(postId)}>
            <UnlikeIcon />
          </span>
        ) : (
          <span
            className="social social-hover"
            onClick={() => likeClickHandler(postId)}
          >
            <LikeIcon />
          </span>
        )}
      </div>
      <div className="social-stats">
        <div className="likes">
          {likes ? likes.length : 0} <span>likes</span>
        </div>
      </div>
      {timestamp && (
        <time className="time-stamp" dateTime={timestamp}>
          {moment(timestamp).startOf("hour").fromNow()}
        </time>
      )}
    </div>
  );
};

export default SocialContainer;
