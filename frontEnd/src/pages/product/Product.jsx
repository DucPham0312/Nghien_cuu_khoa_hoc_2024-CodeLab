import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Gift } from "../../components/Gift";
import { Pagination } from "antd";
export const Product = () => {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  const handlePageChange = async (page) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/product?limit=5&page=${page}`
      );
      setProductData(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error); // Bắt lỗi nếu xảy ra
    }
  };
  useEffect(() => {
    handlePageChange(currentPage);
  }, [currentPage]); // Chạy lại khi currentPage thay đổi
  console.log("product data", productData);
  return (
    <div className="container">
      <div className="product">
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
            <NavLink to="/link" className="breadcrumb__item">
              <p className="breadcrumb__name breadcrumb__active">Sản phẩm </p>
            </NavLink>
          </div>
        </div>
        <div className="row">
          <div className="col-8 col-xl-12">
            <h1 className="product__heading">Sản phẩm nổi bật</h1>
            <p className="product__desc">
              Tổng hợp các sản phẩm chia sẻ về lập trình online và lập trình
              web.
            </p>
            <div className="product__list">
              {productData &&
                productData.data &&
                productData.data.map((product) => {
                  return (
                    <div key={product._id}>
                      <div className="product__item">
                        <div className="product__item--top">
                          <div className="product__info-user">
                            <div className="product__avatar">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/avatar.jpg`}
                                alt=""
                                srcSet=""
                                className="product__avatar--img"
                              />
                            </div>
                            <p className="product__user-name">
                              {product.author}
                            </p>
                          </div>
                          <div className="product__action">
                            <button className="product__save icon">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/save.svg`}
                                alt=""
                                srcSet=""
                                className="product__icon icon"
                              />
                            </button>
                            <button className="product__more icon">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/dots.svg`}
                                alt=""
                                srcSet=""
                                className="product__icon icon"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="product__item--bottom">
                          <div className="row">
                            <div className="col-8 col-md-12">
                              <h2 className="product__title">
                                <NavLink
                                  to={product.linkProduct}
                                  className="product__link"
                                >
                                  {product.title}
                                </NavLink>
                              </h2>
                              <p className="product__item--desc line-clamp">
                                {product.description}
                              </p>
                              <div className="product__info">
                                {product.category.map((cate) => {
                                  return (
                                    <div className="product__tag">
                                      <p className="product__tag-name">
                                        {cate}
                                      </p>
                                    </div>
                                  );
                                })}

                                <div className="product__time">
                                  {formatDateToDayMonth(product.updatedAt)}
                                </div>
                              </div>
                            </div>
                            <div className="col-4 col-md-12 gy-md-3">
                              <div className="product__image">
                                <img
                                  src={product.urlImage}
                                  alt=""
                                  className="product__img"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-4 col-xl-12">
            <div className="product__gift">
              <Gift></Gift>
            </div>
          </div>
        </div>
      </div>
      <div className="product__pagination">
        <Pagination
          align="center"
          defaultCurrent={1}
          total={50}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
