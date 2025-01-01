import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Quote } from "../../components/Quote";
import "./form-study.scss";
import StoreContext from "../../db/Context";
import axios from "axios";
import { useAuth } from "../../context/auth-context/Index";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { DetailsCourse } from "../courses/DetailsCourse";
export const FormStudy = () => {
  const { targetCourses } = useContext(StoreContext);
  const { userLoggedIn, currentUser } = useAuth();
  const [dataCourses, setDataCourses] = useState(null);
  const [dataLesson, setDataLesson] = useState(null);
  const [isRegister, setIsRegister] = useState(null);
  const [fontSize, setFontSize] = useState(16); // Default font size
  const [fontStyle, setFontStyle] = useState("default"); // Default font style
  const [toggleSettings, setToggleSettings] = useState(false);
  const [targetLessonId, setTargetLessonId] = useState(
    "671ba2e0d159f9b05f712f66"
  );

  useEffect(() => {
    const getCourseData = async () => {
      if (!targetCourses) {
        console.log("targetCourses is not set yet");
        return;
      }
      NProgress.start();
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BACKEND_URL}/courses?populate=lessonInfo`
        );
        const foundBlog = res.data.data.find(
          (item) => item._id === targetCourses
        );
        setDataCourses(foundBlog);
      } catch (error) {
        console.log(error);
      } finally {
        NProgress.done(); // Đảm bảo rằng NProgress luôn dừng lại
      }
    };
    getCourseData();
    const getLessonData = async () => {
      NProgress.start();
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BACKEND_URL}/lesson`
        );
        const foundLesson = res.data.data.find(
          (item) => item._id === targetLessonId
        );
        setDataLesson(foundLesson);
      } catch (error) {
        console.log(error);
      } finally {
        NProgress.done(); // Đảm bảo rằng NProgress luôn dừng lại
      }
    };
    getLessonData();
  }, [targetCourses, targetLessonId]);
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
            const isRegisterCourse = foundUser.CoursesInfo.some(
              (course) => course._id === targetCourses
            );
            setIsRegister(isRegisterCourse);
          }
        };
        getUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  }, [currentUser?.uid, userLoggedIn, targetCourses]);
  const increaseFontSize = () => setFontSize((size) => size + 2);
  const decreaseFontSize = () => setFontSize((size) => Math.max(size - 2, 12));
  const handleFontStyleChange = (event) => {
    setFontStyle(event.target.value);
  };
  const fontStyles = {
    default: "Arial, sans-serif",
    serif: "Georgia, serif",
    monospace: "Courier New, monospace",
    cursive: "Comic Sans MS, cursive",
  };
  if (!dataCourses && !isRegister) {
    return (
      <div className="loader__wrap">
        <div className="loader"></div>
        <div className="loader-text">Loading..</div>
      </div>
    );
  }
  return isRegister ? (
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
          <NavLink to="/courses" className="breadcrumb__item">
            <p className="breadcrumb__name">Khóa học của tôi</p>
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
              alt=""
              className="breadcrumb__icon-arrow"
            />
          </NavLink>
          <NavLink to="/courses" className="breadcrumb__item">
            <p className="breadcrumb__name breadcrumb__active">
              {dataCourses.title}
            </p>
          </NavLink>
        </div>
      </div>
      <div
        className="study"
        style={{
          fontSize: `${fontSize}px`,
          fontFamily: fontStyles[fontStyle],
        }}
      >
        <div className="row">
          <div className="col-8 col-xl-12">
            <div className="container">
              <h1 className="study__heading">{dataLesson.title}</h1>
              <div className="controls__wrap d-md-none">
                <p className="study__desc">
                  Viết bởi {dataLesson.author} - {dataLesson.duration} phút đọc
                </p>
                <div className="blog__action-wrap">
                  <button
                    onClick={() => setToggleSettings(!toggleSettings)}
                    className="form__button"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/settings.svg`}
                      alt=""
                      className="form__icon-settings icon"
                    />
                  </button>
                  {toggleSettings === true && (
                    <div className="font-controls">
                      <label htmlFor="fontStyle" className="form__lable">
                        Cỡ chữ:
                      </label>
                      <div className="font-size-controls">
                        <button
                          onClick={decreaseFontSize}
                          className="font-size-btn"
                        >
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/minus.svg`}
                            alt=""
                            className="form__icon icon"
                          />
                        </button>
                        <span className="font-size-display">{fontSize}px</span>
                        <button
                          onClick={increaseFontSize}
                          className="font-size-btn"
                        >
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/plus.svg`}
                            alt=""
                            className="form__icon icon"
                          />
                        </button>
                      </div>
                      <div className="font-style-controls">
                        <label htmlFor="fontStyle" className="form__lable">
                          Kiểu chữ:
                        </label>
                        <select
                          id="fontStyle"
                          value={fontStyle}
                          onChange={handleFontStyleChange}
                          className="font-style-select"
                        >
                          <option value="default">Mặc định</option>
                          <option value="serif">Serif</option>
                          <option value="monospace">Monospace</option>
                          <option value="cursive">Cursive</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: dataLesson.content }}
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily: fontStyles[fontStyle],
                }}
              />
              {/* <div className="study__action">
                {userLoggedIn ? (
                  <button className="btn study__action-btn">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/practice.svg`}
                      alt=""
                      className="study__icon study__icon--animation"
                    />
                    Nhận thưởng
                  </button>
                ) : (
                  <button className="btn study__action-btn">
                    <NavLink to="/login">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon/practice.svg`}
                        alt=""
                        className="study__icon study__icon--animation"
                      />
                      Đăng nhập để nhận thưởng
                    </NavLink>
                  </button>
                )}
              </div> */}
              <h2 className="study__title">Bình luận</h2>

              <div className="study__comment">
                <div className="study__user--comment">
                  <div className="study__user--info">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/layout/1.jpg`}
                      alt=""
                      className="study__user--avatar"
                    />
                    <p className="study__user--name">Người dùng ẩn danh</p>
                    <p className="study__time--comment">5 tháng trước</p>
                  </div>
                  <div className="study__response">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/reply.svg`}
                      alt=""
                      className="study__icon "
                    />
                    <button className="study__response--btn">Phản hồi</button>
                  </div>
                </div>
                <p className="study__reply">Thanks</p>
              </div>
              <form className="study__form">
                <div className="study__user--comment">
                  <div className="study__user--info">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/layout/1.jpg`}
                      alt=""
                      className="study__user--avatar"
                    />
                    <p className="study__user--name d-none d-md-block">
                      CodeLab
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="Nhập bình luận ..."
                    className="study__input"
                  />
                  <button className="study__submit">Gửi</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-4 col-xl-12">
            <div className="study__lesson">
              {dataCourses &&
                dataCourses.lessonInfo.map((lessonInfo) => {
                  return (
                    <button
                      className="study__lesson--item"
                      onClick={() => setTargetLessonId(lessonInfo._id)}
                    >
                      <p className="study__lesson--name">{lessonInfo.title}</p>
                    </button>
                  );
                })}
              {/* <div className="study__lesson--item">
                <p className="study__lesson--name">2. JavaScript cơ bản</p>
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/lock-lesson.svg`}
                  alt=""
                  className="study__lesson-icon icon"
                />
              </div> */}

              <div className="study__quote">
                <Quote></Quote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <DetailsCourse></DetailsCourse>
  );
};
