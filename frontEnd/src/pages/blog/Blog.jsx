import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import { Link, NavLink } from "react-router-dom";
import { Help } from "../../components/Help";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import axios from "axios";
import StoreContext from "../../db/Context";
import { useAuth } from "../../context/auth-context/Index";
export const Blog = () => {
  const { setTargetBlog } = useContext(StoreContext);
  const [newPost, setNewPost] = useState([]);
  const [blog, setBlog] = useState([]);
  const { userLoggedIn, currentUser } = useAuth();
  const [shares, setShares] = useState([]);
  const [users, setUsers] = useState(null);
  const [likedBlog, setLikedBlog] = useState([]);
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
    NProgress.start();
    const getBlog = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/blog`
      );
      setShares(res.data);
      setNewPost(res.data);
      setBlog(res.data);
    };
    getBlog();
    NProgress.done();
  }, []);
  useEffect(() => {
    if (userLoggedIn && currentUser?.uid) {
      try {
        const getUsers = async () => {
          const res = await axios.get(
            `${process.env.REACT_APP_API_BACKEND_URL}/users`
          );

          const foundUser = res.data.data.find(
            (item) => item.userId === currentUser.uid
          );
          if (foundUser) {
            setLikedBlog(foundUser.favoriteBlogInfo);
            setUsers(foundUser);
          }
        };
        getUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  }, [currentUser?.uid, likedBlog, userLoggedIn]);

  const settingsNewPost = {
    autoplaySpeed: 2000,
    dots: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false, // Ẩn mũi tên
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settingsShare = {
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    dots: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false, // Ẩn mũi tên
    rows: 2,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!shares && !newPost && !blog) {
    return (
      <div className="loader__wrap">
        <div className="loader"></div>
        <div className="loader-text">Loading..</div>
      </div>
    );
  }
  console.log("blog", blog);
  const handleLikedBlog = async (blogId) => {
    const blogs = blog.data.find((item) => item._id === blogId);
    if (blogs) {
      const isLiked = likedBlog.includes(blogId);
      if (isLiked) {
        await axios.post(`${process.env.REACT_APP_API_BACKEND_URL}/users`, {
          type: "REMOVE_MY_FV_BLOG",
          userId: users._id,
          blogArr: [blogId],
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API_BACKEND_URL}/users`, {
          type: "ADD_MY_FV_BLOG",
          userId: users._id,
          blogArr: [blogId],
        });
      }
    }
  };

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
          <NavLink to="/blog" className="breadcrumb__item">
            <p className="breadcrumb__name  breadcrumb__active">Blog</p>
          </NavLink>
        </div>
      </div>
      <div className="newPost">
        <div className="newPost__top">
          <div className="newPost__left">
            <h1 className="newPost__heading">BÀI VIẾT MỚI</h1>
          </div>
          <div className="newPost__right">
            <Link to="#!" className="shares__link--top">
              Xem tất cả
            </Link>
          </div>
        </div>
        <div className="newPost__list">
          <div className="slider__container">
            <Slider {...settingsNewPost}>
              {newPost &&
                newPost.data &&
                newPost.data.map((newPost) => {
                  return (
                    <div key={newPost._id} className="newPost__item">
                      <div className="newPost__content--wrap">
                        <picture className="newPost__picture">
                          <img
                            src={`${process.env.PUBLIC_URL}${newPost.urlImage}`}
                            alt={newPost.title}
                            className="newPost__img"
                          />
                        </picture>

                        <div className="newPost__content">
                          <div className="newPost__content--top">
                            <NavLink
                              onClick={() => setTargetBlog(newPost._id)}
                              to="/courses/form-blog"
                            >
                              <h4 className="newPost__title line-clamp">
                                {newPost.title}
                              </h4>
                            </NavLink>
                            <button
                              onClick={() =>
                                userLoggedIn && handleLikedBlog(newPost._id)
                              }
                              className="newPost__like"
                            >
                              {userLoggedIn ? (
                                <>
                                  {likedBlog.includes(newPost._id) ? (
                                    <img
                                      src={`${process.env.PUBLIC_URL}/images/icon/saveactive.svg`}
                                      className="newPost__heart "
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      src={`${process.env.PUBLIC_URL}/images/icon/save.svg`}
                                      className="newPost__heart newPost__active icon"
                                      alt=""
                                    />
                                  )}
                                </>
                              ) : (
                                <>
                                  <Link to="/login">
                                    <img
                                      src={`${process.env.PUBLIC_URL}/images/icon/save.svg`}
                                      className="newPost__heart newPost__active icon "
                                      alt=""
                                    />
                                  </Link>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="newPost__content--bottom">
                            <span className="newPost__time">
                              {formatDateToDayMonth(newPost.updatedAt)}
                            </span>
                            <div className="newPost__timeRead">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/clock.svg`}
                                alt=""
                                className="newPost__time--icon"
                              />
                              <p className="newPost__time">
                                {newPost.duration} phút đọc
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
      <div className="shares">
        <div className="shares__top">
          <div className="shares__top--left">
            <h2 className="shares__heading">BÀI VIẾT NỔI BẬT </h2>
          </div>
          <div className="shares__top--right">
            <Link to="#!" className="shares__link--top">
              Xem tất cả
            </Link>
          </div>
        </div>
        <div className="shares__list">
          <div className="slider-container">
            <Slider {...settingsShare}>
              {shares &&
                shares.data &&
                shares.data.map((share) => {
                  return (
                    <div key={share._id} className="shares__item">
                      <div className="shares__item--wrap">
                        <picture className="shares__pictures">
                          <img
                            src={`${process.env.PUBLIC_URL}${share.urlImage}`}
                            alt={share.title}
                            className="shares__img"
                          />
                        </picture>
                        <div className="shares__content">
                          <div className="separate"></div>
                          <NavLink
                            onClick={() => setTargetBlog(share._id)}
                            to="/courses/form-blog"
                          >
                            <h1 className="shares__title line-clamp">
                              {share.title}
                            </h1>
                          </NavLink>

                          <div className="newPost__content--bottom">
                            <div className="newPost__timeRead">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/clock.svg`}
                                alt=""
                                className="newPost__time--icon"
                              />
                              <p className="newPost__time">
                                {formatDateToDayMonth(share.updatedAt)}
                              </p>
                            </div>
                            <div className="newPost__views">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/eye.svg`}
                                alt=""
                                className="newPost__views--icon icon"
                              />
                              <span className="newPost__views--number">
                                {share.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>

      <Help></Help>
    </div>
  );
};
