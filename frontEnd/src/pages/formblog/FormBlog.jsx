import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Quote } from "../../components/Quote";
import "./form-blog.scss";
import StoreContext from "../../db/Context";
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export const FormBlog = () => {
  const { targetBlog } = useContext(StoreContext);
  const [dataBlog, setDataBlog] = useState(null);
  const [fontSize, setFontSize] = useState(16); // Default font size
  const [fontStyle, setFontStyle] = useState("default"); // Default font style
  const [toggleSettings, setToggleSettings] = useState(false);
  useEffect(() => {
    const getBlogData = async () => {
      if (!targetBlog) {
        console.log("targetBlog is not set yet");
        return;
      }

      NProgress.start();
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BACKEND_URL}/blog`
        );
        const foundBlog = res.data.data.find((item) => item._id === targetBlog);
        setDataBlog(foundBlog);
      } catch (error) {
        console.log(error);
      } finally {
        NProgress.done(); // Đảm bảo rằng NProgress luôn dừng lại
      }
    };

    getBlogData();
  }, [targetBlog]);
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
  if (!dataBlog) {
    return (
      <div className="loader__wrap">
        <div className="loader"></div>
        <div className="loader-text">Loading..</div>
      </div>
    );
  }

  return (
    <div key={dataBlog._id}>
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
            <NavLink to="/blog" className="breadcrumb__item">
              <p className="breadcrumb__name">Blog</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="#!" className="breadcrumb__item">
              <p className="breadcrumb__name breadcrumb__active">
                {dataBlog.title}
              </p>
            </NavLink>
          </div>
        </div>
        <div
          className="blog"
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: fontStyles[fontStyle],
          }}
        >
          <div className="row">
            <div className="col-9 col-lg-12">
              <div className="container">
                <h1 className="blog__heading">{dataBlog.title}</h1>
                <div className="controls__wrap d-md-none">
                  <p className="blog__desc">
                    Viết bởi {dataBlog.author} - {dataBlog.duration} phút đọc
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
                          <span className="font-size-display">
                            {fontSize}px
                          </span>
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
                  dangerouslySetInnerHTML={{ __html: dataBlog.content }}
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: fontStyles[fontStyle],
                  }}
                />
                {/* <div className="blog__action">
                  {userLoggedIn ? (
                    <button className="btn blog__action-btn">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon/practice.svg`}
                        alt=""
                        className="blog__icon blog__icon--animation"
                      />
                      Nhận thưởng
                    </button>
                  ) : (
                    <button className="btn blog__action-btn">
                      <NavLink to="/login">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/practice.svg`}
                          alt=""
                          className="blog__icon blog__icon--animation"
                        />
                        Đăng nhập để nhận thưởng
                      </NavLink>
                    </button>
                  )}
                </div> */}
                <h2 className="blog__title">Bình luận</h2>

                <div className="blog__comment">
                  <div className="blog__user--comment">
                    <div className="blog__user--info">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/layout/avatar.png`}
                        alt=""
                        className="blog__user--avatar"
                      />
                      <p className="blog__user--name">CodeLab</p>
                      <p className="blog__time--comment">5 tháng trước</p>
                    </div>
                    <div className="blog__response">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon/reply.svg`}
                        alt=""
                        className="blog__icon "
                      />
                      <button className="blog__response--btn">Phản hồi</button>
                    </div>
                  </div>
                  <p className="blog__reply">Thanks</p>
                </div>
                <form className="blog__form">
                  <div className="blog__user--comment">
                    <div className="blog__user--info">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/layout/avatar.png`}
                        alt=""
                        className="blog__user--avatar"
                      />
                      <p className="blog__user--name d-none d-md-block">
                        CodeLab
                      </p>
                    </div>
                    <input
                      type="text"
                      placeholder="Nhập bình luận ..."
                      className="blog__input"
                    />
                    <button className="blog__submit">Gửi</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-3 col-lg-12">
              <Quote />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
