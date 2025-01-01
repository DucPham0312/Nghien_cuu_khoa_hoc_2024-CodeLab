// The code was written by programmer CodeLab
// Thanks for watching and sharing
import React, { useState } from "react";
import Logo from "../../components/LogoMain";
import { Navigate, Link, NavLink } from "react-router-dom";
import { Validation } from "../../services/Validation";
import { useAuth } from "../../context/auth-context/Index";
import { doCreateUserWithEmailAndPassword } from "../../firebase/Auth";
import { doSignInWithGoogle } from "../../firebase/Auth";
import { Toast } from "../../components/ToastError";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
export const SignUp = () => {
  const [error, setError] = useState({});
  const [values, setValues] = useState({});
  const [show, setShow] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { userLoggedIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    NProgress.start();
    e.preventDefault();
    const validationErrors = Validation(values);
    setError(validationErrors);
    if (Object.keys(validationErrors).length === 0 && !isRegistering) {
      try {
        setIsRegistering(true);
        const { email, password } = values;
        await doCreateUserWithEmailAndPassword(email, password);
        setIsRegistering(false);
      } catch {
        showToast();
        await delay(4000); // Chờ 2000ms (2 giây)
      }
    }
    NProgress.done();
  };
  const [isShowToast, setIsShowToast] = useState(false);
  const showToast = () => {
    setIsShowToast(true);
    setTimeout(() => {
      setIsShowToast(false);
    }, 4000);
  };
  const onGoogleSignIn = (e) => {
    NProgress.start();
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
    NProgress.done();
  };
  if (userLoggedIn) {
    return <Navigate to="/home" replace={true} />;
  }

  return (
    <div>
      <div className="signUp">
        <div
          className={`row row-cols-2 row-cols-md-1 signUp__wrap ${
            show ? "signUp__md-active" : ""
          }`}
        >
          <div className="col d-md-none">
            <div className="signUp__background">
              <div className="signUp__image">
                <img
                  src={`${process.env.PUBLIC_URL}/images/login/img1.svg`}
                  alt=""
                  className="signUp__img"
                />
              </div>
              <h2 className="signUp__desc">
                Chào mừng bạn đến với Code
                <span className="signUp__highlight">Lab</span>!
              </h2>
              <p className="signUp__copyright">
                Khoa Điện Tử - Đại Học Công Nghiệp Hà Nội ❤️
              </p>
              <div
                onClick={() => setShow(true)}
                className="signUp__next d-none d-md-flex"
              >
                <div className="signUp__dot"></div>
                <div className="signUp__dot"></div>
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/arrow_right.svg`}
                  alt=""
                  className="signUp__arrow--icon"
                />
              </div>
            </div>
          </div>
          <div className="col signUp__wrap">
            <div className="signUp__content">
              <Logo />
              <h1 className="signUp__title">Đăng ký</h1>
              <p className="signUp__title--desc">
                Học tập là quá trình bền bỉ và lâu dài. Hãy để chúng tôi giúp
                bạn đạt tới thành công đó.
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
                    className={`input__email input__form ${
                      error.email
                        ? "input__border--error"
                        : "input__border--success"
                    }`}
                  />
                  {error.email ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/error.svg`}
                      alt=""
                      className="input__error--icon"
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/message.svg`}
                      alt=""
                      className="input__icon"
                    />
                  )}
                  {error.email && (
                    <p className="input__error--text">{error.email}</p>
                  )}
                </div>
                <div className="input__form--wrap">
                  <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Mật khẩu"
                    className={`input__password input__form ${
                      error.password
                        ? "input__border--error"
                        : "input__border--success"
                    }`}
                  />
                  {error.password ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/error.svg`}
                      alt=""
                      className="input__error--icon"
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/lock.svg`}
                      alt=""
                      className="input__icon"
                    />
                  )}
                </div>
                <div className="input__form--wrap">
                  <input
                    onChange={handleChange}
                    name="confirmPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Nhập lại mật khẩu"
                    className={`input__password input__form ${
                      error.confirmPassword
                        ? "input__border--error"
                        : "input__border--success"
                    }`}
                  />
                  {error.confirmPassword ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/error.svg`}
                      alt=""
                      className="input__error--icon"
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/lock.svg`}
                      alt=""
                      className="input__icon"
                    />
                  )}
                  {error.confirmPassword && (
                    <p className="input__error--text">
                      {error.confirmPassword}
                    </p>
                  )}
                </div>
                <div className="input__action">
                  <div className="input__checkbox">
                    <div className="input__checkbox--container">
                      <input
                        type="checkbox"
                        id="default"
                        className="input__default"
                      />
                      <span className="input__checkmark"></span>
                    </div>
                    <p className="input__default--title">Đặt làm mặc định</p>
                  </div>
                  <Link to="./login" className="input__forgot">
                    Đăng nhập ngay?
                  </Link>
                </div>
                <div className="input__button--wrap">
                  <button
                    type="submit"
                    className="form__btn--primary input__button"
                  >
                    Đăng ký
                  </button>
                  <NavLink
                    onClick={onGoogleSignIn}
                    className="form__btn--outline input__button"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/google-line.svg`}
                      alt=""
                    />
                    Đăng ký với Google
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isShowToast && <Toast></Toast>}
    </div>
  );
};
