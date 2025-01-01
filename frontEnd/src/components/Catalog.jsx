import React from "react";

export const Catalog = () => {
  return (
    <div className="catalog">
      <div className="row catalog__wrap">
        <div className="col-7 col-xl-12">
          <h2 className="catalog__heading">
            Chào mừng các bạn đến với Website CodeLab 🎊
          </h2>
          <p className="catalog__desc">
            CodeLab hi vọng sẽ là con thuyền đưa các bạn trở thành một lập trình
            viên chuyên nghiệp
          </p>
          <div className="catalog__btn">
            {/* <button className="catalog__button">
              Nhận 10 sao ngày hôm nay
            </button> */}
          </div>
        </div>
        <div className="col-5 col-xl-12">
          <img
            src={`${process.env.PUBLIC_URL}/images/catalog/catalog.gif`}
            alt="catalog__icon"
            className="catalog__icon"
          />
        </div>
      </div>
      <button onClick={() => {}} className="catalog__cancel">
        <img
          src={`${process.env.PUBLIC_URL}/images/icon/cancel.svg`}
          alt=""
          className="catalog__icon--cancel"
        />
      </button>
    </div>
  );
};
