// The code was written by programmer CodeLab
// Thanks for watching and sharing
import React from "react";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { Validation } from "../../services/Validation";
import Logo from "../../components/LogoMain";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/Auth";
import { useAuth } from "../../context/auth-context/Index";
import { Toast } from "../../components/ToastError";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
export const Login = () => {
  const { userLoggedIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState({});
  const [values, setValues] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values, // sao chép lại đối tượng cũ
      [e.target.name]: e.target.value, // cập nhật giá trị dựa trên name
    });
  };
  const [isShowToast, setIsShowToast] = useState(false);
  const showToast = () => {
    setIsShowToast(true);
    setTimeout(() => {
      setIsShowToast(false);
    }, 4000);
  };
  const { email, password } = values;
  const handleSubmit = async (e) => {
    e.preventDefault();
    NProgress.start();
    setError(Validation(values));
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        showToast();
        setIsSigningIn(false);
      }
    }
    NProgress.done();
  };
  const onGoogleSignIn = (e) => {
    e.preventDefault();
    NProgress.start();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        console.log(err);
        setIsSigningIn(false);
      });
    }
    NProgress.done();
  };
  return (
    <div>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <div className="login">
        <div
          className={`row row-cols-2 row-cols-md-1 login__wrap ${
            show === true ? "login__md-active" : ""
          }`}
        >
          <div className="col d-md-none">
            <div className="login__background ">
              <div className="login__image">
                <img
                  src={`${process.env.PUBLIC_URL}/images/login/img1.svg`}
                  alt=""
                  className="login__img"
                />
              </div>
              <h2 className="login__desc">
                Chào mừng bạn trở lại với Code
                <span className="login__highlight">Lab</span>!
              </h2>
              <p className="login__copyright">
                Khoa Điện Tử - Đại Học Công Nghiệp Hà Nội ❤️
              </p>
              <div
                onClick={() => setShow(true)}
                className="login__next d-none d-md-flex "
              >
                <div className="login__dot"></div>
                <div className="login__dot"></div>
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/arrow_right.svg`}
                  alt=""
                  className="login__arrow--icon"
                />
              </div>
            </div>
          </div>
          <div className="col login__wrap">
            <div className="login__content">
              <Logo></Logo>
              <h1 className="login__title">Chào mừng quay trở lại!</h1>
              <p className="login__title--desc">
                Chào mừng bạn đã quay trở lại , hãy đăng nhập và lưu lại để đăng
                nhập lần sau được dễ dàng hơn
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
                      className="input__error--icon input__error--icon-login"
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
                <div className="input__form--wrap">
                  <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    autoFocus
                    placeholder="Mật khẩu "
                    className={`input__password input__form ${
                      error.password
                        ? "input__border--error"
                        : "input__border--success"
                    }`}
                  />

                  {error.password ? (
                    <>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon/error.svg`}
                        alt=""
                        className="input__error--icon input__error--icon-login"
                      />
                      {error.password && (
                        <p className="input__error--text">{error.password}</p>
                      )}
                    </>
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/lock.svg`}
                      alt=""
                      className="input__icon"
                    />
                  )}
                </div>

                <div className="input__action">
                  <div className="input__checkbox">
                    <div className="input__checkbox--container">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="input__default"
                      />
                      <span className="input__checkmark"></span>
                    </div>
                    <p className="input__default--title">Đặt làm mặc định</p>
                  </div>
                  <NavLink to="./resetpassword" className="input__forgot">
                    Quên mật khẩu ?
                  </NavLink>
                </div>
                <div className="input__button--wrap">
                  <button
                    type="submit"
                    className="form__btn--primary input__button"
                  >
                    Đăng nhập
                  </button>
                  <NavLink
                    onClick={onGoogleSignIn}
                    className="form__btn--outline input__button"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/google-line.svg`}
                      alt=""
                    />
                    Đăng nhập với Google
                  </NavLink>
                </div>
                <p className="login__signUp">
                  Bạn chưa có tài khoản?{" "}
                  <NavLink to="/signup" className="login__signUp--highlight">
                    Đăng ký ngay
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isShowToast && <Toast></Toast>}
    </div>
  );
};
