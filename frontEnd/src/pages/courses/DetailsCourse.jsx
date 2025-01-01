import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import StoreContext from "../../db/Context";
import axios from "axios";
import { useAuth } from "../../context/auth-context/Index";
export const DetailsCourse = () => {
  const { targetCourses } = useContext(StoreContext);
  const { userLoggedIn, currentUser } = useAuth();
  const [courses, setCourses] = useState(null);
  const [isRegister, setIsRegister] = useState(null);
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(null);
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
          setUser(foundUser);
        };
        getUsers();
      } catch (error) {
        if (error.message === "Network Error") {
          console.log("Không có mạng");
        }
        console.error("Error fetching users:", error);
      }
    }
  }, [currentUser?.uid, userLoggedIn, targetCourses]);
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BACKEND_URL}/courses?populate=lessonInfo`
        );
        const foundCourses = await res.data.data.find(
          (item) => item._id === targetCourses
        );
        setCourses(foundCourses);
      } catch (error) {
        if (error.message === "Network Error") {
          console.log("Không có mạng");
        }
        console.error("Error fetching courses:", error);
      }
    };

    getCourses();
  }, [targetCourses]);
  const handleRegisterCourses = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BACKEND_URL}/users`,
        {
          type: "ADD_MY_COURSE",
          userId: user._id,
          courseArr: [targetCourses],
        }
      );

      if (response.status === 200) {
        setIsRegister(true);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Đăng ký khóa học thất bại:", error);
    }
  };

  const [toggle, setToggle] = useState(false);
  if (!courses) {
    return (
      <div className="loader__wrap">
        <div className="loader"></div>
        <div className="loader-text">Loading..</div>
      </div>
    );
  }
  return (
    <div>
      {success === true ? (
        <div id="toast" className="toast toast--success">
          <div className="toast__icon">
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/like.svg`}
              alt=""
              className="toast__icon-svg"
            />
          </div>
          <div className="toast__body">
            <h3 className="toast__title">Thành Công</h3>
            <p className="toast__msg">
              Đăng ký khóa học thành công vui lòng quay trở lại để tiếp tục
            </p>
          </div>
          <div className="toast__close">
            <i className="fas fa-times"></i>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="container">
        <div className="detail">
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
              <NavLink to="/studyplant/frontEnd" className="breadcrumb__item">
                <p className="breadcrumb__name breadcrumb__active">
                  {courses.title}
                </p>
              </NavLink>
            </div>
          </div>
          <div className="row detail__main">
            <div className="col-8 col-lg-12">
              <h1 className="detail__heading"> {courses.title}</h1>
              <p className="detail__desc">
                Trong khóa này chúng ta sẽ cùng nhau tìm hiểu về {courses.title}
                mà chúng ta cần biết khi học về Website
              </p>
              {/* <div className="detail__reward">
                <h2 className="detail__heading">Bạn sẽ học được những gì</h2>
                <div className="row row-cols-2 row-cols-md-1 detail__reward--list">
                  <div className="col">
                    <ul>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/check.svg`}
                          alt=""
                          className="detail__check--icon"
                        />
                        Biết cách đặt tên class CSS theo chuẩn BEM
                      </li>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/check.svg`}
                          alt=""
                          className="detail__check--icon"
                        />
                        Biết cách đặt tên class CSS theo chuẩn BEM
                      </li>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/check.svg`}
                          alt=""
                          className="detail__check--icon"
                        />
                        Làm chủ Flexbox khi dựng bố cục website
                      </li>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/check.svg`}
                          alt=""
                          className="detail__check--icon"
                        />
                        Biết cách tự tạo động lực cho bản thân
                      </li>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/check.svg`}
                          alt=""
                          className="detail__check--icon"
                        />
                        Học được cách làm UI chỉn chu, kỹ tính
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/check.svg`}
                          alt=""
                          className="detail__check--icon"
                        />
                        Biết cách xây dựng giao diện web với HTML, CSS
                      </li>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/check.svg`}
                          alt=""
                          className="detail__check--icon"
                        />
                        Biết cách đặt tên class CSS theo chuẩn BEM
                      </li>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/check.svg`}
                          alt=""
                          className="detail__check--icon"
                        />
                        Làm chủ Flexbox khi dựng bố cục website
                      </li>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/check.svg`}
                          alt=""
                          className="detail__check--icon"
                        />
                        Biết cách tự tạo động lực cho bản thân
                      </li>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/check.svg`}
                          alt=""
                          className="detail__check--icon"
                        />
                        Học được cách làm UI chỉn chu, kỹ tính
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
              <div className="detail__content">
                <h2 className="detail__heading">Nội dung khóa học</h2>
                <div className="detail__info">
                  <div className="detail__info--left">
                    <p className="detail__text">
                      {" "}
                      • {courses.lessonInfo.length} bài học
                    </p>
                    <p className="detail__text">
                      • 6 giờ 19 phút tổng thời lượng
                    </p>
                  </div>
                  <div className="detail__info--right">
                    <button
                      onClick={() => setToggle(!toggle)}
                      className="detail__extend--button"
                    >
                      Mở rộng tất cả các phần
                    </button>
                  </div>
                </div>
                <div className="detail__list">
                  {courses &&
                    courses.lessonInfo &&
                    courses.lessonInfo.map((course) => {
                      return (
                        <div key={course._id}>
                          <button className="detail__item--info">
                            <div className="detail__item--wrap">
                              {/* <img
                        src={`${process.env.PUBLIC_URL}/images/icon/${
                          toggle ? "arrow-up.svg" : "arrow-down.svg"
                        }`}
                        alt=""
                        srcSet=""
                        className="detail__icon icon"
                      /> */}
                              <p className="detail__item-text">
                                {course.title}
                              </p>
                            </div>
                            {/* <p className="detail__item--desc">8 bài học</p> */}
                          </button>
                        </div>
                      );
                    })}

                  {/* {toggle && (
                    <div className="detail__lecture--wrap">
                      <div className="detail__lecture">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/file.svg`}
                          alt=""
                          srcSet=""
                          className="detail__icon icon"
                        />
                        <p className="detail__text">
                          1. Bạn sẽ làm được gì sau khóa học?
                        </p>
                      </div>
                      <div className="detail__lecture">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/file.svg`}
                          alt=""
                          srcSet=""
                          className="detail__icon icon"
                        />
                        <p className="detail__text">2. Tìm hiểu về HTML, CSS</p>
                      </div>
                      <div className="detail__lecture">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/pen.svg`}
                          alt=""
                          srcSet=""
                          className="detail__icon icon"
                        />
                        <p className="detail__text">
                          3. Cài đặt VS Code, Page Ruler extension
                        </p>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
            <div className="col-4 d-lg-none">
              <div className="detail__wrap">
                <div className="detail__background d-xl-none">
                  <img
                    src={courses.courseImage}
                    alt=""
                    srcSet=""
                    className="detail__img"
                  />
                </div>
                <div className="detail__price">Miễn phí</div>

                {isRegister === true ? (
                  <Link to="/courses" className="btn detail__register">
                    Quay lại
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleRegisterCourses();
                    }}
                    className="btn detail__register"
                  >
                    Đăng ký ngay
                  </button>
                )}
                <div className="detail__includes">
                  <p className="detail__includes--heading">
                    Khóa học này cung cấp
                  </p>

                  <div className="detail__item">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/level.svg`}
                      alt=""
                      srcSet=""
                      className="detail__icon icon"
                    />
                    <p className="detail__text">Trình độ cơ bản</p>
                  </div>
                  <div className="detail__item">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/file.svg`}
                      alt=""
                      srcSet=""
                      className="detail__icon icon"
                    />
                    <p className="detail__text">
                      {courses.lessonInfo.length} bài học
                    </p>
                  </div>
                  <div className="detail__item">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/lesson.svg`}
                      alt=""
                      srcSet=""
                      className="detail__icon icon"
                    />
                    <p className="detail__text">Bài tập luyện tập mỗi bài</p>
                  </div>
                  <div className="detail__item">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/star.svg`}
                      alt=""
                      srcSet=""
                      className="detail__icon"
                    />
                    <p className="detail__text">Tổng số 100 ⭐</p>
                  </div>
                  <div className="detail__item">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/certify.svg`}
                      alt=""
                      srcSet=""
                      className="detail__icon icon"
                    />
                    <p className="detail__text">Có chứng nhận khi hoàn thành</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-none d-lg-block detail__md--button">
        {isRegister === true ? (
          <Link
            to="/courses"
            className="btn detail__register detail__register-lg"
          >
            Quay lại
          </Link>
        ) : (
          <button
            onClick={() => {
              handleRegisterCourses();
            }}
            className="btn detail__register detail__register-lg"
          >
            Đăng ký ngay
          </button>
        )}
      </div>
    </div>
  );
};
