import React from "react";
import { NavLink } from "react-router-dom";

export const Gift = () => {
  return (
    <NavLink to="/gift" className="gift">
      <div className="gift__wrap">
        <div className="gift__image--wrap">
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/gift.svg`}
            alt=""
            className="gift__icon"
          />
        </div>
        <div className="gift__content">
          <h3 className="gift__title">Món quà nho nhỏ này dành cho bạn!</h3>
          <p className="gift__desc line-clamp">
            Chúng tôi sẽ đảm bảo rằng tất cả các sản phẩm có sẵn trong đơn hàng
            của bạn sẽ được đóng gói cẩn thận và vận chuyển trực tiếp đến địa
            chỉ của người nhận
          </p>
        </div>
      </div>
    </NavLink>
  );
};
