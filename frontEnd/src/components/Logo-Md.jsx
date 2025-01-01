import React from "react";
import { NavLink } from "react-router-dom";
const LogoMedium = () => {
  return (
    <div className="logo-md">
      <NavLink to="/home" className="logo-md__wrap">
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
          alt="logo-md"
          className="logo-md__img"
        />
        <span className="logo-md__name">
          Code<span className="logo-md__highlight">Lab</span>
        </span>
      </NavLink>
    </div>
  );
};

export default LogoMedium;
