import React from "react";
import "./LandingPageDashboard.css";
import {
  BarChartOutlined,
  BookOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "../Image/logo-svcc.png";
import ManageBook from "./ManageBook.js";

const LandingPageDashboard = () => {
  return (
    <div className="dashboard-main-container">
      <div className="sidebar">
        <div className="logo-container">
          <img className="avatar" src={logo} />
          <p>Rebadulla Jellian</p>
        </div>
        <div className="btn-sidebar">
          <button>
            <BookOutlined />
            Manage Book
          </button>
          <button>
            <UserOutlined />
            Manage User
          </button>
          <button>
            <BarChartOutlined />
            Book Report
          </button>
        </div>
      </div>
      <div className="categories-container">
        <ManageBook />
      </div>
    </div>
  );
};

export default LandingPageDashboard;
