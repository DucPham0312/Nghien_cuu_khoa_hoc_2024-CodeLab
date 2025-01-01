import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth-context/Index";
export const Profile = () => {
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
      <div className="profile-page">
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
                        <Link to="#!"></Link>
                        <button className="profile-menu__link profile__active">
                          <span className="profile-menu__icon">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/icon/profile.svg`}
                              alt="profile"
                              className="icon"
                            />
                          </span>
                          Thông tin cá nhân
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="profile-menu">
                    <h3 className="profile-menu__title">Danh mục sản phẩm</h3>
                    <ul className="profile-menu__list">
                      <li>
                        <Link to="/personal">
                          <button
                            onClick={() => setPath("courses")}
                            className={`profile-menu__link`}
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
                        </Link>
                      </li>
                      <li>
                        <Link to="/personal">
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
                        </Link>
                      </li>
                      <li>
                        <Link to="/personal">
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
                        </Link>
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
                      <div className="new-card__top">
                        <h2 className="profile__heading">Thông tin cá nhân</h2>
                      </div>
                      <form action="" className="form">
                        <div className="row row-cols-2 row-cols-md-1">
                          <div className="form__group">
                            <label
                              for="Firstname"
                              className="control__label control__label-medium"
                            >
                              Họ
                            </label>
                            <div className="form__control form__profile">
                              <input
                                type="text"
                                name="Firstname"
                                placeholder="Truong"
                                className="form__input"
                                required
                                autofocus
                                autocomplete="new-password"
                              />
                            </div>
                          </div>
                          <div className="form__group">
                            <label
                              for="lastname"
                              className="control__label control__label-medium"
                            >
                              Tên
                            </label>
                            <div className="form__control form__profile">
                              <input
                                type="text"
                                name="lastname"
                                placeholder="Tuan Anh"
                                className="form__input"
                                required
                                autocomplete="new-password"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row row-cols-2 row-cols-md-1">
                          <div className="form__group">
                            <label
                              for="phone-number"
                              className="control__label control__label-medium"
                            >
                              Số điện thoại
                            </label>
                            <div className="form__control form__profile">
                              <input
                                type="tel"
                                name="phone-number"
                                placeholder="+84 373691203"
                                className="form__input"
                                required
                                minlength="11"
                                autocomplete="new-password"
                              />
                            </div>
                          </div>
                          <div className="form__group">
                            <label
                              for="card-number"
                              className="control__label control__label-medium"
                            >
                              Mật khẩu
                            </label>
                            <div className="form__control form__profile">
                              <input
                                type="password"
                                name="card-number"
                                placeholder="******"
                                className="form__input"
                                required
                                minlength="6"
                                autocomplete="new-password"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form__group">
                          <div className="form-card__bottom">
                            <button className="btn form__cancel">Hủy</button>
                            <button className=" form__btn btn ">
                              Lưu chỉnh sửa
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
