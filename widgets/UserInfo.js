import Link from "next/link";
import { useRouter } from "next/router";

const UserInfo = ({
  global,
  onClick,
  userName,
  fullName,
  profileImage,
  width = "56",
  height = "56",
}) => {
  const router = useRouter();

  const profileClickHandler = () => {
    if (!global) return;
    if (onClick) onClick();
    router.push(`/${userName}`);
  };

  return (
    <div
      className="user-detail"
      onClick={profileClickHandler}
      style={{ cursor: global ? "pointer" : "default" }}
    >
      <div className="user-image-div">
        <Link href={`/${userName}`}>
          <img
            width={width}
            alt="user-img"
            height={height}
            src={profileImage ? profileImage : "/user-img.jpg"}
          />
        </Link>
      </div>
      <div className="user-name-div">
        <div className="username">
          <Link href={`/${userName}`}>
            <span>{userName}</span>
          </Link>
        </div>
        <div className="fullname">{fullName}</div>
      </div>
    </div>
  );
};

export default UserInfo;
