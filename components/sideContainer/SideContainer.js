import Link from "next/link";
import UserInfo from "../../widgets/UserInfo";

import Footer from "../footer";

function SideContainer(props) {
  const { user } = props;

  let profileImage = "/user-img.jpg";

  if (user?.profileImage?.url) {
    profileImage = user.profileImage.url;
  }

  return (
    <div className="side-container">
      <UserInfo
        fullName={user?.fullName}
        userName={user?.userName}
        profileImage={profileImage}
      />
      <div className="suggestions">
        <div className="title-info">
          <div className="title">Suggestions For You</div>
          <div className="see-more">
            <Link href="/">See All</Link>
          </div>
        </div>
        <div className="suggestions-container"></div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default SideContainer;
