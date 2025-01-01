// The code was written by programmer CodeLab
// Thanks for watching and sharing

import React from "react";
export const Search = () => {
  return (
    <div className="search d-md-none">
      <input
        className="search__input"
        type="text"
        placeholder="Tìm kiếm khóa học ..."
      />
      <button className="search__button">
        <img
          src={`${process.env.PUBLIC_URL}/images/icon/search.svg`}
          className="search__icon icon"
          alt=""
        />
      </button>
    </div>
  );
};
