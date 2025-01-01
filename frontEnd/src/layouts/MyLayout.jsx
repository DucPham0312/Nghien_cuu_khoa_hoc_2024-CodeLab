// The code was written by programmer CodeLab
// Thanks for watching and sharing

import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect, useContext } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import MyRoute from "../routes/Router";
import Logo from "../components/LogoMain";
import axios from "axios";
import { LogoOnly } from "../components/Logo-Only";
import { NavLink } from "react-router-dom";
import { Search } from "../components/Search";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import StoreContext from "../db/Context";
import { useAuth } from "../context/auth-context/Index";
import { doSignOut } from "../firebase/Auth";
import LogoMedium from "../components/Logo-Md";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const { Header, Sider, Content } = Layout;
const MyLayout = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { theme, handleChangeTheme } = useContext(StoreContext);
  const [collapsed, setCollapsed] = useState(true);
  const [notification, setNotification] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const bellRef = useRef(null);
  const userRef = useRef(null);
  const searchRef = useRef(null);
  const { setTargetCourses } = useContext(StoreContext);
  const { currentUser } = useAuth();
  const [listTutorials, setListTutorials] = useState([]);
  const [toogleSearch, setToogleSearch] = useState(false);
  useEffect(() => {
    document.documentElement.className = theme; // Thay đổi class của thẻ `html`
    const handleClickOutSide = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setNotification(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUser(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setToogleSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [theme]);
  const menuItems = [
    {
      key: "1",
      icon: (
        <NavLink to="/home">
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/home.svg`}
            alt="svg"
            className="nav__icon icon"
          />
        </NavLink>
      ),
      label:
        collapsed === false ? (
          <NavLink
            className={`nav__link ${({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""}`}
            to="/home"
          >
            Trang chủ
          </NavLink>
        ) : null,
    },
    {
      key: "2",
      icon: (
        <NavLink to="/studyplant">
          {" "}
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/study.svg`}
            alt="svg"
            className="nav__icon icon"
          />
        </NavLink>
      ),
      label:
        collapsed === false ? (
          <NavLink
            className={`nav__link ${({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""}`}
            to="/studyplant"
          >
            Kế hoạch
          </NavLink>
        ) : null,
    },
    {
      key: "3",
      icon: (
        <NavLink to="/courses">
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/course.svg`}
            alt="svg"
            className="nav__icon icon "
          />
        </NavLink>
      ),
      label:
        collapsed === false ? (
          <NavLink
            className={`nav__link ${({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""}`}
            to="/courses"
          >
            Khóa học
          </NavLink>
        ) : null,
    },
    {
      key: "4",
      icon: (
        <NavLink to="/flashcard">
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/flashcard.svg`}
            alt="svg"
            className="nav__icon nav__icon--active"
          />
        </NavLink>
      ),
      label:
        collapsed === false ? (
          <NavLink
            className={`nav__link ${({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""}`}
            to="/flashcard"
          >
            FlashCard
          </NavLink>
        ) : null,
    },
    {
      key: "5",
      icon: (
        <NavLink to="/blog">
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/blog.svg`}
            alt="svg"
            className="nav__icon icon"
          />
        </NavLink>
      ),
      label:
        collapsed === false ? (
          <NavLink
            className={`nav__link ${({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""}`}
            to="/blog"
          >
            Bài viết
          </NavLink>
        ) : null,
    },
    {
      key: "6",
      icon: (
        <NavLink to="/link">
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/link.svg`}
            alt="svg"
            className="nav__icon icon"
          />
        </NavLink>
      ),
      label:
        collapsed === false ? (
          <NavLink
            className={`nav__link ${({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""}`}
            to="/link"
          >
            Bài viết
          </NavLink>
        ) : null,
    },
    {
      key: "7",
      icon: (
        <NavLink
          to="https://tuananhdeptrai16.github.io/editor/"
          target="_blank"
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/codelab.svg`}
            alt="svg"
            className="nav__icon icon"
          />
        </NavLink>
      ),
      label:
        collapsed === false ? (
          <NavLink
            className={`nav__link ${({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""}`}
            to="https://tuananhdeptrai16.github.io/editor/"
          >
            LabCode
          </NavLink>
        ) : null,
    },
  ];
  useEffect(() => {
    NProgress.start();
    const handlePageChange = async (page) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BACKEND_URL}/courses`
        );
        setListTutorials(res.data);
      } catch (error) {
        console.error("Error fetching data: ", error); // Bắt lỗi nếu xảy ra
      }
    };
    handlePageChange();
    NProgress.done();
  }, []);
  console.log("checklist ", listTutorials);
  const [getInfoSearch, setGetInfoSearch] = useState("");
  const [arrInfoSearch, setArrInfoSearch] = useState([]);
  const [displayInfoArr, setDisplayInfoArr] = useState([]);
  const handleGetSearchInfo = async () => {
    let arr = await listTutorials.data;
    const targetIds = arr
      .filter((item) => {
        return item.title
          .toLocaleLowerCase()
          .trim()
          .includes(getInfoSearch.toLocaleLowerCase().trim());
      })
      .map((item) => item._id);
    setToogleSearch(true);
    setArrInfoSearch(targetIds);
    let TargetCourse = arrInfoSearch.map((id) => {
      let result = listTutorials.data.find((item1) => item1._id === id);
      return result;
    });
    if (getInfoSearch.trim() === "") {
      setArrInfoSearch([]);
      setDisplayInfoArr([]);
      return; // Thoát khỏi hàm
    }
    setDisplayInfoArr(TargetCourse);
  };
  console.log("checkdisplay info", displayInfoArr);
  return (
    <>
      <Layout className="layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={`layout__background ${
            collapsed ? "d-md-none" : "logo-only"
          }`}
        >
          {collapsed === false ? <Logo /> : <LogoOnly />}
          <Menu
            style={{
              backgroundColor:
                theme === "light"
                  ? "#f5f5f5f5"
                  : theme === "dark"
                  ? "#171c28"
                  : "#f5f5f5f5",
            }}
            mode="inline"
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              position: "relative",
            }}
          >
            <div
              className="header__wrap"
              style={{
                backgroundColor: theme === "light" ? "#fff" : "#292E39",
              }}
            >
              <Button
                type="button"
                icon={
                  collapsed ? (
                    <MenuUnfoldOutlined
                      style={{ color: theme === "light" ? "#292E39" : "#ffff" }}
                    />
                  ) : (
                    <MenuFoldOutlined
                      style={{ color: theme === "light" ? "#292E39" : "#ffff" }}
                    />
                  )
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "20px",
                  width: 64,
                  height: 64,
                }}
              />
              <div className="logo__header d-none d-md-block">
                <LogoMedium></LogoMedium>
              </div>
              <div className="header__action">
                {userLoggedIn ? (
                  <>
                    <div className="search d-md-none">
                      <input
                        className="search__input"
                        type="text"
                        value={getInfoSearch}
                        onChange={(e) => {
                          handleGetSearchInfo();
                          setGetInfoSearch(e.target.value);
                        }}
                        placeholder="Tìm kiếm khóa học ..."
                      />
                      <button
                        onClick={() => {
                          handleGetSearchInfo();
                        }}
                        className="search__button"
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/search.svg`}
                          className="search__icon icon"
                          alt=""
                        />
                      </button>
                    </div>
                    {displayInfoArr &&
                      notification === false &&
                      toogleSearch === true && (
                        <div className="header__search" ref={searchRef}>
                          <div className="header__bell--wrap">
                            <div className="header__bell--top">
                              <h3 className="header__bell--title">
                                Kết quả tìm kiếm
                              </h3>
                            </div>
                            {displayInfoArr.map((item) => {
                              return (
                                <div key={item._id}>
                                  <div className="header__search--list">
                                    <div className="header__bell--item">
                                      <Link
                                        to={
                                          userLoggedIn
                                            ? "/courses/form-study"
                                            : "/login"
                                        }
                                      >
                                        <picture className="header__search--avatar">
                                          <img
                                            src={item.courseImage}
                                            alt=""
                                            className="header__search--img"
                                          />
                                        </picture>
                                      </Link>
                                      <div
                                        onClick={() =>
                                          setTargetCourses(item._id)
                                        }
                                        className="header__search--content"
                                      >
                                        <Link
                                          to={
                                            userLoggedIn
                                              ? "/courses/form-study"
                                              : "/login"
                                          }
                                        >
                                          <p
                                            onClick={() =>
                                              setTargetCourses(item._id)
                                            }
                                            className="header__search--title"
                                          >
                                            {item.title}
                                          </p>
                                        </Link>
                                        <p className="header__search--desc line-clamp">
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    <div className="header__notification">
                      <button onClick={() => setNotification(!notification)}>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/notification.svg`}
                          alt=""
                          className="header__notification--icon icon"
                        />
                      </button>
                      <span className="header__number--notification">1</span>
                      {notification && (
                        <div className="header__bell" ref={bellRef}>
                          <div className="header__bell--wrap">
                            <div className="header__bell--top">
                              <h3 className="header__bell--title">Thông báo</h3>
                              <span className="header__flag">
                                Đánh dấu đọc tất cả
                              </span>
                            </div>
                            <div className="header__bell--list">
                              <div className="header__bell--item">
                                <div className="header__bell--avatar">
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/layout/avatar.png`}
                                    alt=""
                                    className="header__bell--img"
                                  />
                                </div>
                                <div className="header__bell--content">
                                  <p className="header__bell--notification">
                                    Bài học
                                    <strong>
                                      Mở event đua TOP trả lời câu hỏi
                                    </strong>
                                    mới được thêm vào.
                                  </p>
                                  <p className="header__bell--date">
                                    9 ngày trước
                                  </p>
                                </div>
                              </div>
                              <div className="header__bell--item">
                                <div className="header__bell--avatar">
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/layout/avatar.png`}
                                    alt=""
                                    className="header__bell--img"
                                  />
                                </div>
                                <div className="header__bell--content">
                                  <p className="header__bell--notification">
                                    Bài học
                                    <strong>
                                      Mở event đua TOP trả lời câu hỏi{" "}
                                    </strong>
                                    mới được thêm vào.
                                  </p>
                                  <p className="header__bell--date">
                                    9 ngày trước
                                  </p>
                                </div>
                              </div>
                              <div className="header__bell--item">
                                <div className="header__bell--avatar">
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/layout/avatar.png`}
                                    alt=""
                                    className="header__bell--img"
                                  />
                                </div>
                                <div className="header__bell--content">
                                  <p className="header__bell--notification line-clamp">
                                    Bài học
                                    <strong>
                                      Mở event đua TOP trả lời câu hỏi{" "}
                                    </strong>
                                    mới được thêm vào.
                                  </p>
                                  <p className="header__bell--date">
                                    9 ngày trước
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      onClick={() => setShowUser(!showUser)}
                      className="header__avatar"
                    >
                      <img
                        src={
                          currentUser.photoURL
                            ? currentUser.photoURL
                            : `${process.env.PUBLIC_URL}/images/user.png`
                        }
                        alt=""
                        className="header__avatar--image"
                      />
                      {showUser && notification === false ? (
                        <div className="header__user" ref={userRef}>
                          <div className="header__user--wrap">
                            <div className="header__user--info">
                              <img
                                src={
                                  currentUser.photoURL
                                    ? currentUser.photoURL
                                    : `${process.env.PUBLIC_URL}/images/user.png`
                                }
                                alt=""
                                className="header__user--avatar"
                              />
                              <div className="header__user--info-wrap">
                                <p className="header__user--name">
                                  {currentUser.displayName
                                    ? currentUser.displayName
                                    : "Người dùng"}
                                </p>
                                <p className="header__user--id">
                                  {currentUser.displayName
                                    ? currentUser.email
                                    : "@user"}
                                </p>
                              </div>
                            </div>
                            <div className="header__user--separate"></div>
                            <ul className="header__user--list">
                              <li>
                                <Link
                                  to="/personal"
                                  className="header__user--link"
                                >
                                  Trang cá nhân
                                </Link>
                              </li>
                              <div className="header__user--separate"></div>

                              <li>
                                <Link
                                  to={"/create-blog"}
                                  className="header__user--link"
                                >
                                  Viết Blog
                                </Link>
                              </li>
                              <li>
                                <button
                                  onClick={() => handleChangeTheme(theme)}
                                  className="header__user--theme"
                                >
                                  Chủ đề :
                                  <span>
                                    {theme === "light" ? "Tối" : "Sáng"}
                                  </span>
                                </button>
                              </li>
                              <div className="header__user--separate"></div>

                              <li>
                                <button
                                  onClick={() => {
                                    doSignOut().then(() => {
                                      navigate("/login");
                                    });
                                  }}
                                  className="header__user--link"
                                >
                                  Đăng xuất
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  <div className="header__action">
                    <Search></Search>
                    <div className="header__button">
                      <button className="header__btn--login btn ">
                        <NavLink to="/login">Đăng nhập</NavLink>
                      </button>
                      <button className="header__btn--singup btn d-md-none">
                        <NavLink to="/signup">Đăng ký</NavLink>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              minHeight: 280,
              background:
                theme === "light"
                  ? "#fff"
                  : theme === "dark"
                  ? "#292E39"
                  : "#ffff",
              borderRadius: 10,
            }}
          >
            <MyRoute />
          </Content>
          <Footer></Footer>
        </Layout>
        {collapsed === false ? (
          <div
            onClick={() => setCollapsed(!collapsed)}
            className="overlay"
          ></div>
        ) : (
          ""
        )}
      </Layout>
    </>
  );
};

export default MyLayout;
