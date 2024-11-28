import React from "react";
import "./Search.css";
import { Input } from "antd";

const Search = () => {
  const { Search } = Input;

  return (
    <div className="search-main-container">
      <div className="add-btn">
        <button type="button" class="button">
          <span class="button__text">Add New Book</span>
          <span class="button__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke="currentColor"
              height="24"
              fill="none"
              class="svg"
            >
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg>
          </span>
        </button>
      </div>
      <div className="search-container">
        <Search
          className="custom-search"
          placeholder="Seach book here..."
          allowClear
          enterButton="Search"
          size="large"
          //   onSearch={onSearch}
        />
      </div>
    </div>
  );
};

export default Search;
