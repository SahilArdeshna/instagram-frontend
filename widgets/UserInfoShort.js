import Link from "next/link";

const UserInfoShort = ({ username, profileImage }) => {
  return (
    <div className="post-header">
      <div className="profile-image-div">
        <div className="image-div">
          <Link href={`/${username}`}>
            <img
              alt="profile-pic"
              src={profileImage ? profileImage : "/user-img.jpg"}
              width="32px"
              height="32px"
            />
          </Link>
        </div>
      </div>
      <div className="username-div">
        <div className="username">
          <div className="name">
            <Link href={`/${username}`}>
              <span className="name-span">{username || ""}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoShort;
