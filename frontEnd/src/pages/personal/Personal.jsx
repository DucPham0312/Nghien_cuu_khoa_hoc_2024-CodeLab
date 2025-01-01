import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import StoreContext from "../../db/Context";
import { useAuth } from "../../context/auth-context/Index";
export const Personal = () => {
  const [userInfo, setUserInfo] = useState([]);
  const { userLoggedIn, currentUser } = useAuth();
  const [path, setPath] = useState("courses");

  const formatDateToDayMonth = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const monthNames = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} ${month}, ${year}`;
  };
  useEffect(() => {
    if (userLoggedIn && currentUser?.uid) {
      try {
        const getUsers = async () => {
          const res = await axios.get(
            `${process.env.REACT_APP_API_BACKEND_URL}/users?populate=favoriteListInfo,notificationInfo,favoriteBlogInfo,CoursesInfo`
          );

          const foundUser = res.data.data.find(
            (item) => item.userId === currentUser.uid
          );
          if (foundUser) {
            setUserInfo(foundUser);
          }
        };
        getUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  }, [currentUser?.uid, userLoggedIn]);
  const { setTargetBlog, setTargetCourses } = useContext(StoreContext);

  return (
    <div className="container">
      <div className="breadcrumb">
        <div className="breadcrumb__wrap">
          <NavLink to="/home" className="breadcrumb__item">
            <p className="breadcrumb__name">Trang chủ</p>
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
              alt=""
              className="breadcrumb__icon-arrow"
            />
          </NavLink>
          <NavLink to="/personal" className="breadcrumb__item">
            <p className="breadcrumb__name  breadcrumb__active">
              Trang cá nhân
            </p>
          </NavLink>
        </div>
      </div>
      <main className="profile-page">
        <div className="container">
          <div className="profile-container">
            <div className="row gy-3">
              <div className="col-3 col-xl-4 col-lg-5 col-md-12">
                <div className="profile__sidebar">
                  <div className="profile__user">
                    <img
                      src={userInfo && userInfo.data && userInfo.data.photoURL}
                      alt="avatar"
                      className="profile__user--avatar"
                    />
                    <h1 className="profile__user--name">
                      {userInfo && userInfo.data && userInfo.data.displayName}
                    </h1>
                    <p className="profile__user--desc">
                      Ngày đăng ký: {formatDateToDayMonth(userInfo.updatedAt)}
                    </p>
                  </div>
                  <div className="profile-menu">
                    <h3 className="profile-menu__title">Quản lý tài khoản</h3>
                    <ul className="profile-menu__list">
                      <li>
                        <Link to="/profile">
                          <button className="profile-menu__link">
                            <span className="profile-menu__icon">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/profile.svg`}
                                alt="profile"
                                className="icon"
                              />
                            </span>
                            Thông tin cá nhân
                          </button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="profile-menu">
                    <h3 className="profile-menu__title">Danh mục sản phẩm</h3>
                    <ul className="profile-menu__list">
                      <li>
                        <button
                          onClick={() => setPath("courses")}
                          className={`profile-menu__link ${
                            path === "courses" && "profile__active"
                          }`}
                        >
                          <span className="profile-menu__icon">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/icon/dowload.svg`}
                              alt="profile"
                              className="icon"
                            />
                          </span>
                          Khóa học của tôi
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setPath("favoriteCourses")}
                          className={`profile-menu__link ${
                            path === "favoriteCourses" && "profile__active"
                          }`}
                        >
                          <span className="profile-menu__icon">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/icon/heart.svg`}
                              alt=""
                              className="icon"
                            />
                          </span>
                          Danh sách yêu thích
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setPath("blogs")}
                          className={`profile-menu__link ${
                            path === "blogs" && "profile__active"
                          }`}
                        >
                          <span className="profile-menu__icon">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/icon/blog1.svg`}
                              alt=""
                              className="icon"
                            />
                          </span>
                          Blog đã lưu
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="profile-menu">
                    <h3 className="profile-menu__title">Dịch vụ khách hàng</h3>
                    <ul className="profile-menu__list">
                      <li>
                        <a href="#!" className="profile-menu__link">
                          <span className="profile-menu__icon">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/icon/help.svg`}
                              alt="help"
                              className="icon"
                            />
                          </span>
                          Trợ giúp
                        </a>
                      </li>
                      <li>
                        <a href="#!" className="profile-menu__link">
                          <span className="profile-menu__icon">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/icon/warn.svg`}
                              alt=""
                              className="icon"
                            />
                          </span>
                          Điều khoản và dịch vụ
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-9 col-xl-8 col-lg-7 col-md-12 profile__bg">
                <div className="cart-info profile-info">
                  <div className="row gy-3 gy-md-2">
                    <div className="col-12">
                      {path === "courses" && (
                        <>
                          <h2 className="profile__heading">
                            Thông tin cá nhân
                          </h2>
                          <p className="profile__desc profile__desc">
                            Thông tin cá nhân , địa chỉ Email
                          </p>
                          <div className="row row-cols-2 row-cols-lg-1">
                            <div className="col">
                              <article className="account-info">
                                <div className="account-info__icon">
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/icon/message1.svg`}
                                    alt="message1"
                                    className="icon"
                                  />
                                </div>
                                <div>
                                  <h3 className="account-info__title">
                                    Địa chỉ Email
                                  </h3>
                                  <p className="account-info__desc">
                                    {userInfo &&
                                      userInfo.data &&
                                      userInfo.data.email}
                                  </p>
                                </div>
                              </article>
                            </div>
                            <div className="col">
                              <article className="account-info">
                                <div className="account-info__icon">
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/icon/calling.svg`}
                                    alt="message1"
                                    className="icon"
                                  />
                                </div>
                                <div>
                                  <h3 className="account-info__title">
                                    Số điện thoại
                                  </h3>
                                  <p className="account-info__desc">
                                    {userInfo &&
                                      userInfo.data &&
                                      userInfo.data.email}
                                  </p>
                                </div>
                              </article>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="col-12">
                      <h2 className="profile__heading">
                        {path === "blogs"
                          ? "Blogs đã lưu"
                          : path === "favoriteCourses"
                          ? "Khóa học yêu thích"
                          : path === "courses"
                          ? "Khóa học đã đăng ký"
                          : ""}
                      </h2>
                      <p className="cart-info__desc profile__desc">
                        {path === "blogs"
                          ? userInfo.favoriteBlogInfo &&
                            userInfo.favoriteBlogInfo.length
                          : path === "favoriteCourses"
                          ? userInfo.favoriteListInfo &&
                            userInfo.favoriteListInfo.length
                          : path === "courses"
                          ? userInfo.CoursesInfo && userInfo.CoursesInfo.length
                          : ""}
                        {} danh mục
                      </p>
                      {path === "blogs" ? (
                        <>
                          {userInfo.favoriteBlogInfo &&
                            userInfo.favoriteBlogInfo.map((blog) => {
                              return (
                                <div key={blog._id}>
                                  <article className="favorite-item">
                                    <img
                                      src={blog.urlImage}
                                      alt={blog.title}
                                      className="favorite-item__thumb"
                                    />
                                    <Link
                                      onClick={() => setTargetBlog(blog._id)}
                                      to="/courses/form-blog"
                                    >
                                      <h3 className="favorite-item__title">
                                        {blog.title}
                                      </h3>

                                      <p className="favorite-item__desc line-clamp">
                                        {blog.description}
                                      </p>
                                      <div className="favorite-item__content">
                                        <span className="favorite-item__price">
                                          {/* {favorite.price.amount === 0
                                           ? "Miễn phí"
                                           : favorite.price.amount} */}
                                        </span>
                                      </div>
                                    </Link>
                                  </article>
                                  <div className="separate profile__separate"></div>
                                </div>
                              );
                            })}
                        </>
                      ) : path === "favoriteCourses" ? (
                        <>
                          {userInfo.favoriteListInfo &&
                            userInfo.favoriteListInfo.map((favorite) => {
                              return (
                                <div key={favorite._id}>
                                  <article className="favorite-item">
                                    <img
                                      src={favorite.courseImage}
                                      alt={favorite.title}
                                      className="favorite-item__thumb"
                                    />

                                    <Link
                                      onClick={() =>
                                        setTargetCourses(favorite._id)
                                      }
                                      to="/courses/form-study"
                                    >
                                      <h3 className="favorite-item__title">
                                        {favorite.title}
                                      </h3>
                                      <p className="favorite-item__desc line-clamp">
                                        {favorite.description}
                                      </p>
                                      <div className="favorite-item__content">
                                        <span className="favorite-item__price">
                                          {/* {favorite.price.amount === 0
                                            ? "Miễn phí"
                                            : favorite.price.amount} */}
                                        </span>
                                      </div>
                                    </Link>
                                  </article>
                                  <div className="separate profile__separate"></div>
                                </div>
                              );
                            })}
                        </>
                      ) : path === "courses" ? (
                        <>
                          {userInfo.CoursesInfo &&
                            userInfo.CoursesInfo.map((favorite) => {
                              return (
                                <div key={favorite._id}>
                                  <article className="favorite-item">
                                    <img
                                      src={favorite.courseImage}
                                      alt={favorite.title}
                                      className="favorite-item__thumb"
                                    />
                                    <Link
                                      onClick={() =>
                                        setTargetCourses(favorite._id)
                                      }
                                      to="/courses/form-study"
                                    >
                                      <h3 className="favorite-item__title">
                                        {favorite.title}
                                      </h3>
                                      <p className="favorite-item__desc line-clamp">
                                        {favorite.description}
                                      </p>
                                    </Link>
                                  </article>
                                  <div className="separate profile__separate"></div>
                                </div>
                              );
                            })}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
