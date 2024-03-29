import Link from "next/link";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useCallback, useEffect, useRef, useState } from "react";

import Loader from "../../icons/Loader";
import CreateIcon from "../../icons/Create";
import UserInfo from "../../widgets/UserInfo";
import CreateBlackIcon from "../../icons/CreateBlack";
import * as userActions from "../../store/user/actions";
import * as authActions from "../../store/auth/actions";
import * as modalActions from "../../store/modal/actions";

function Navbar(props) {
  const router = useRouter();
  const timeoutRef = useRef();
  const {
    user,
    logout,
    searchUser,
    showCreateModal,
    openCreateModal,
    closeCreateModal,
    search: { users, page, limit, isSearching },
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  let profileImage = "/user-img.jpg";
  if (user?.profileImage?.url) {
    profileImage = user.profileImage.url;
  }

  // On logout handler function
  const onLogoutHandler = () => {
    // Call logout function
    logout();

    // Redirect user to login page
    router.replace("/accounts/login");
  };

  const inputChangeHandler = (e) => setSearchInput(e.target.value);

  // Popover
  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <div>
          <Link href={`/${user?.userName}`}>
            <div className="profile">
              <svg
                aria-label="Profile"
                className="_8-yf5 "
                fill="#262626"
                height="16"
                viewBox="0 0 32 32"
                width="16"
              >
                <path d="M16 0C7.2 0 0 7.1 0 16c0 4.8 2.1 9.1 5.5 12l.3.3C8.5 30.6 12.1 32 16 32s7.5-1.4 10.2-3.7l.3-.3c3.4-3 5.5-7.2 5.5-12 0-8.9-7.2-16-16-16zm0 29c-2.8 0-5.3-.9-7.5-2.4.5-.9.9-1.3 1.4-1.8.7-.5 1.5-.8 2.4-.8h7.2c.9 0 1.7.3 2.4.8.5.4.9.8 1.4 1.8-2 1.5-4.5 2.4-7.3 2.4zm9.7-4.4c-.5-.9-1.1-1.5-1.9-2.1-1.2-.9-2.7-1.4-4.2-1.4h-7.2c-1.5 0-3 .5-4.2 1.4-.8.6-1.4 1.2-1.9 2.1C4.2 22.3 3 19.3 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13c0 3.3-1.2 6.3-3.3 8.6zM16 5.7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path>
              </svg>
              <span>Profile</span>
            </div>
          </Link>
          <hr />
          <div className="logout" onClick={onLogoutHandler}>
            Logout
          </div>
        </div>
        {/* <div>
          <Row>
          </Row>
          <Row>
          </Row>
        </div> */}
      </Popover.Content>
    </Popover>
  );

  const globalSearch = useCallback(() => {
    try {
      clearTimeout(timeoutRef.current);

      if (!searchInput) return;

      timeoutRef.current = setTimeout(() => {
        searchUser(page, limit, searchInput);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }, [page, limit, searchInput]);

  useEffect(() => {
    globalSearch();

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [globalSearch]);

  return (
    <nav>
      <div className="navbar-div">
        <div className="nav-container">
          <div className="instagram-logo-container">
            <Link href="/" passHref>
              <div className="logo-div">
                <div className="logo">
                  <img
                    alt="insta-logo"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="search-container">
            <input
              autoFocus
              type="text"
              value={searchInput}
              placeholder="Search"
              className="search-input"
              onChange={inputChangeHandler}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {!isFocused && !searchInput && (
              <div
                tabIndex="0"
                className="search-div"
                onClick={() => setIsFocused(true)}
              >
                <div className="search">
                  <span className="search-icon"></span>
                  <span className="search-title">Search</span>
                </div>
              </div>
            )}
            {searchInput && (
              <div
                tabIndex="0"
                role="button"
                className="input-clear-icon"
                onClick={() => setSearchInput("")}
              ></div>
            )}
            {searchInput && (
              <div className="global-search">
                {!isEmpty(users) && (
                  <div className="search-result">
                    {users.map((user) => (
                      <UserInfo
                        width="44"
                        height="44"
                        global={true}
                        fullName={user?.fullName}
                        userName={user?.userName}
                        profileImage={user?.profileImage?.url}
                      />
                    ))}
                  </div>
                )}
                {isSearching && (
                  <div
                    className="profile-loader"
                    style={{ alignItems: "center" }}
                  >
                    <Loader />
                  </div>
                )}
                {!isSearching && isEmpty(users) && (
                  <div className="empty-results">No searche results.</div>
                )}
              </div>
            )}
          </div>
          <div className="other-nav">
            <div className="other-div">
              <div className="home-div">
                <div className="home">
                  <Link href="/">
                    {/* <svg
                      aria-label="Home"
                      className="home-svg"
                      fill="#262626"
                      height="22"
                      viewBox="0 0 48 48"
                      width="22"
                    >
                      {router.pathname === "/" ? (
                        <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
                      ) : (
                        <path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path>
                      )}
                    </svg> */}
                    <svg
                      aria-label="Home"
                      className="home-svg"
                      color="rgb(0, 0, 0)"
                      fill="rgb(0, 0, 0)"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path
                        d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
              {/* <div className="home-div">
                <Link href="/">
                  <svg
                    aria-label="Messenger"
                    className="home-svg"
                    fill="#262626"
                    height="22"
                    viewBox="0 0 48 48"
                    width="22"
                  >
                    {router.pathname === "/messages" ? (
                      <path
                        clipRule="evenodd"
                        d="M10.2 29.8c-.7 1 .6 2.2 1.6 1.5l7.3-5.5c.5-.4 1.2-.4 1.7 0l5.4 4c1.6 1.2 3.9.8 5-.9L38 18.2c.7-1-.6-2.2-1.6-1.5L29 22.2c-.5.4-1.2.4-1.7 0l-5.4-4c-1.6-1.2-3.9-.8-5 .9l-6.7 10.7zM24 1c13 0 23 9.5 23 22.3S37 45.6 24 45.6c-2.3 0-4.6-.3-6.7-.9-.4-.1-.8-.1-1.2.1l-4.6 2c-1.1.6-2.5-.3-2.5-1.6l-.1-4.1c0-.5-.2-1-.6-1.3C3.7 35.8 1 30 1 23.3 1 10.5 11 1 24 1z"
                        fillRule="evenodd"
                      ></path>
                    ) : (
                      <path d="M36.2 16.7L29 22.2c-.5.4-1.2.4-1.7 0l-5.4-4c-1.6-1.2-3.9-.8-5 .9l-6.8 10.7c-.7 1 .6 2.2 1.6 1.5l7.3-5.5c.5-.4 1.2-.4 1.7 0l5.4 4c1.6 1.2 3.9.8 5-.9l6.8-10.7c.6-1.1-.7-2.2-1.7-1.5zM24 1C11 1 1 10.5 1 23.3 1 30 3.7 35.8 8.2 39.8c.4.3.6.8.6 1.3l.2 4.1c0 1 .9 1.8 1.8 1.8.2 0 .5 0 .7-.2l4.6-2c.2-.1.5-.2.7-.2.2 0 .3 0 .5.1 2.1.6 4.3.9 6.7.9 13 0 23-9.5 23-22.3S37 1 24 1zm0 41.6c-2 0-4-.3-5.9-.8-.4-.1-.8-.2-1.3-.2-.7 0-1.3.1-2 .4l-3 1.3V41c0-1.3-.6-2.5-1.6-3.4C6.2 34 4 28.9 4 23.3 4 12.3 12.6 4 24 4s20 8.3 20 19.3-8.6 19.3-20 19.3z"></path>
                    )}
                  </svg>
                </Link>
              </div> */}

              <div className="home-div">
                {showCreateModal ? (
                  <div onClick={closeCreateModal}>
                    <CreateBlackIcon />
                  </div>
                ) : (
                  <div onClick={openCreateModal}>
                    <CreateIcon />
                  </div>
                )}
              </div>

              {/* <div className="home-div">
                <Link href="/">
                  <svg
                    aria-label="Find People"
                    className="home-svg"
                    fill="#262626"
                    height="22"
                    viewBox="0 0 48 48"
                    width="22"
                  >
                    {router.pathname === "/explore" ? (
                      <path
                        clipRule="evenodd"
                        d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm12.2 13.8l-7 14.8c-.1.3-.4.6-.7.7l-14.8 7c-.2.1-.4.1-.6.1-.4 0-.8-.2-1.1-.4-.4-.4-.6-1.1-.3-1.7l7-14.8c.1-.3.4-.6.7-.7l14.8-7c.6-.3 1.3-.2 1.7.3.5.4.6 1.1.3 1.7zm-15 7.4l-5 10.5 10.5-5-5.5-5.5z"
                        fillRule="evenodd"
                      ></path>
                    ) : (
                      <path
                        clipRule="evenodd"
                        d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
                        fillRule="evenodd"
                      ></path>
                    )}
                  </svg>
                </Link>
              </div> */}
              {/* <div className="home-div">
                <Link href="/">
                  <svg
                    aria-label="Activity Feed"
                    className="_8-yf5 "
                    fill="#262626"
                    height="22"
                    viewBox="0 0 48 48"
                    width="22"
                  >
                    {router.pathname === "/notifications" ? (
                      <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                    ) : (
                      <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                    )}
                  </svg>
                </Link>
              </div> */}
              <div className="home-div">
                <div
                  className={`img-setting ${
                    router.pathname === "/[userName]" ? "active" : ""
                  }`}
                ></div>
                <span>
                  <OverlayTrigger
                    trigger="click"
                    placement="auto"
                    overlay={popover}
                    rootClose={true}
                  >
                    <img
                      alt="user-img"
                      src={profileImage}
                      width="100%"
                      height="100%"
                    />
                  </OverlayTrigger>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Map state to props
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    search: state.user.search,
    showCreateModal: state.modal.createModal.show,
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authActions.logout()),
    openCreateModal: () => dispatch(modalActions.openCreateModal()),
    closeCreateModal: () => dispatch(modalActions.closeCreateModal()),
    searchUser: (page, limit, searchInput) =>
      dispatch(userActions.searchUserGlobal(page, limit, searchInput)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
