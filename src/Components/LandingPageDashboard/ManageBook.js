import React from "react";
import "./ManageBook.css";
import AntTable from "./Table";
import Search from "./Search";

const ManageBook = () => {
  return (
    <div className="manageBook-main-container">
      <div className="table-container">
        <Search />
        <AntTable />
      </div>
    </div>
  );
};

export default ManageBook;
