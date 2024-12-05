import React, { useState } from "react";
import "./Search.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";

const SearchBar = ({ onClick }) => {
  const { Search } = Input;

  return (
    <div className="search-main-container">
      <div className="add-btn">
        <button type="button" className="button" onClick={onClick}>
          <PlusCircleOutlined className="add-icon" />
          <span className="button__text">Add New Book</span>
        </button>
      </div>

      <div className="search-container">
        <Search
          className="custom-search"
          placeholder="Search book here..."
          allowClear
          enterButton="Search"
          size="large"
        />
      </div>
    </div>
  );
};

export default SearchBar;
