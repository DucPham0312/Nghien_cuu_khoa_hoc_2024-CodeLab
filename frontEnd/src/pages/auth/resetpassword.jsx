// The code was written by programmer CodeLab
// Thanks for watching and sharing
import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../components/LogoMain";
import { doPasswordReset } from "../../firebase/Auth";
import { validateEmail } from "../../services/ValidationEmail";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
export const ResetPassword = () => {
  const [error, setError] = useState({});
  const [values, setValues] = useState({});
  const [show, setShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (e) => {
    NProgress.start();
    setValues({
      ...values, // sao chép lại đối tượng cũ
      [e.target.name]: e.target.value, // cập nhật giá trị dựa trên name
    });
    NProgress.done();
  };
  const handleSubmit = (e) => {
    NProgress.start();
    e.preventDefault();
    const validationErrors = validateEmail(values.email);
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Proceed with password reset if no validation errors
      doPasswordReset(values.email)
        .then(() => {
          setValues("");
          setSuccessMessage("Đã gửi Email khôi phục mật khẩu!");
        })
        .catch((error) => {
          setError(error);
        });
    }
    NProgress.done();
  };
  return (
    <div className="reset">
      <div
        className={`row row-cols-2 row-cols-md-1 reset__wrap ${
          show === true ? "reset__md-active" : ""
        }`}
      >
        <div className="col d-md-none">
          <div className="reset__background ">
            <div className="reset__image">
              <img
                src={`${process.env.PUBLIC_URL}/images/reset/reset.svg`}
                alt=""
                className="reset__img"
              />
            </div>
            <h2 className="reset__desc">
              Đừng lo! Code
              <span className="reset__highlight">Lab </span>! ở đây là để giúp
              bạn
            </h2>
            <p className="reset__copyright">
              Khoa Điện Tử - Đại Học Công Nghiệp Hà Nội ❤️
            </p>
            <div
              onClick={() => setShow(true)}
              className="reset__next d-none d-md-flex "
            >
              <div className="reset__dot"></div>
              <div className="reset__dot"></div>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/arrow_right.svg`}
                alt=""
                className="reset__arrow--icon"
              />
            </div>
          </div>
        </div>
        <div className="col reset__wrap">
          <div className="reset__content">
            <Logo></Logo>
            <h1 className="reset__title">Cài đặt lại mật khẩu!</h1>
            <p className="reset__title--desc">
              Bạn vui lòng điền đầy đủ thông tin vào đây !! Sau đó kiểm tra lại
              hòm thư để cài đặt lại mật khẩu.
            </p>

            <form className="input" onSubmit={handleSubmit}>
              <div className="input__form--wrap">
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  autoComplete="username"
                  required
                  autoFocus
                  placeholder="Email"
                  className={`input__email input__form  ${
                    error.email
                      ? "input__border--error"
                      : "input__border--success"
                  }`}
                />

                {error.email ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/error.svg`}
                    alt=""
                    className="input__error--icon  input__error--icon-login"
                  />
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/message.svg`}
                    alt=""
                    className={`input__icon`}
                  />
                )}
                {error.email && (
                  <p className="input__error--text">{error.email}</p>
                )}
              </div>

              <div className="input__button--wrap">
                <button
                  type="submit"
                  className="form__btn--primary input__button"
                >
                  Gửi yêu cầu Reset !
                </button>
                {successMessage && (
                  <div className="input__notification--success">
                    <p className="input__success--text">
                      {successMessage}
                      <NavLink to="/login" className="input__success-backLogin">
                        Đăng nhập ngay
                      </NavLink>
                    </p>
                  </div>
                )}
              </div>
              <p className="reset__signUp">
                Bạn chưa có tài khoản?
                <NavLink to="/signup" className="reset__signUp--highlight">
                  Đăng ký ngay
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
