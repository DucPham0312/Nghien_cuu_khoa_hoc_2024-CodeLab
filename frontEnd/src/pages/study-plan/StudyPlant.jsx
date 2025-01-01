import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Help } from "../../components/Help";
import { Gift } from "../../components/Gift";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
export const StudyPlant = () => {
  const [routePlants, setRoutePlants] = useState([]);
  const [community, setCommunity] = useState([]);
  useEffect(() => {
    NProgress.start();
    fetch(`${process.env.PUBLIC_URL}/json/db.json`)
      .then((response) => response.json())
      .then((data) => {
        setRoutePlants(data.studyRoute || []);
        setCommunity(data.FacebookCommunity || []);
      })
      .catch((error) => console.log(error));
    NProgress.done();
  }, []);
  return (
    <div className="container">
      <div className="studyPlant">
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
            <NavLink to="/studyplant" className="breadcrumb__item">
              <p className="breadcrumb__name breadcrumb__active">StudyPlant</p>
            </NavLink>
          </div>
        </div>
        <div className="row studyPlant__wrap">
          <div className="col-9 col-xxl-8 col-xl-12">
            <div className="studyPlant__title">
              <h1 className="studyPlant__heading">Lộ trình học </h1>
              <p className="studyPlant__desc">
                Lộ trình học lập trình web từ cơ bản đến nâng cao giúp bạn thành
                thạo giao diện và tương tác người dùng hiệu quả
              </p>
            </div>
            <div className="studyPlant__list">
              {routePlants.map((routePlant) => {
                return (
                  <div key={routePlant.id} className="studyPlant__item">
                    <div className="row">
                      <div className="col-4 col-xxl-5 col-md-12">
                        <picture className="studyPlant__image">
                          <img
                            src={`${process.env.PUBLIC_URL}${routePlant.img}`}
                            alt=""
                            className="studyPlant__img"
                          />
                        </picture>
                      </div>
                      <div className="col-8 col-xxl-7 col-md-12 gy-md-2">
                        <div className="studyPlant__content">
                          <h3 className="studyPlant__content-title">
                            {routePlant.title}
                          </h3>
                          <p className="studyPlant__content--desc line-clamp-3">
                            {routePlant.description}
                          </p>
                          <NavLink
                            to={routePlant.link}
                            className="btn studyPlant__button"
                          >
                            Xem chi tiết
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="studyPlant__connect">
              <h1 className="studyPlant__connect--heading">
                Tham gia công đồng trên Facebook
              </h1>
              <div className="studyPlant__connect--list">
                {community.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="studyPlant__routePlants--item"
                    >
                      {" "}
                      <div className="row">
                        <div className="col-4 col-xxl-5 col-md-12">
                          <picture className="studyPlant__image">
                            <img
                              src={`${process.env.PUBLIC_URL}${item.img}`}
                              alt=""
                              className="studyPlant__img"
                            />
                          </picture>
                        </div>
                        <div className="col-8 col-xxl-7 col-md-12 gy-md-2">
                          <div className="studyPlant__content">
                            <h3 className="studyPlant__content-title">
                              Cộng đồng Code
                              <span className="studyPlant__highlight">Lab</span>
                            </h3>
                            <p className="studyPlant__content--desc line-clamp-3">
                              {item.description}
                            </p>
                            <NavLink
                              to="https://www.facebook.com/groups/congdongitsupport?locale=vi_VN"
                              className="btn studyPlant__button"
                            >
                              Tham gia ngay
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-3 col-xxl-4 col-xl-12">
            <Gift></Gift>
            <Gift></Gift>
          </div>
        </div>
      </div>
      <Help></Help>
    </div>
  );
};
