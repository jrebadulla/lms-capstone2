import React, { useState } from "react";
import "./LandingPageDashboard.css";
import {
  BarChartOutlined,
  BookOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "../Image/logo-svcc.png";
import ManageBook from "./ManageBook.js";
import BookReport from "./BookReport.js";

const LandingPageDashboard = () => {
  const [activeSection, setActiveSection] = useState("manageBook");

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard-main-container">
      <div className="sidebar">
        <div className="logo-container">
          <img className="avatar" src={logo} alt="Logo" />
          <p>Rebadulla Jellian</p>
        </div>
        <div className="btn-sidebar">
          <button
            className={activeSection === "manageBook" ? "active" : ""}
            onClick={() => handleButtonClick("manageBook")}
          >
            <BookOutlined />
            Manage Book
          </button>
          <button
            className={activeSection === "manageUser" ? "active" : ""}
            onClick={() => handleButtonClick("manageUser")}
          >
            <UserOutlined />
            Manage User
          </button>
          <button
            className={activeSection === "bookReport" ? "active" : ""}
            onClick={() => handleButtonClick("bookReport")}
          >
            <BarChartOutlined />
            Book Report
          </button>
        </div>
      </div>
      <div className="categories-container">
        {activeSection === "manageBook" && <ManageBook />}
        {activeSection === "manageUser" && <div>Manage User Content</div>}
        {activeSection === "bookReport" && <BookReport />}
      </div>
    </div>
  );
};

export default LandingPageDashboard;
