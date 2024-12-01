import React, { useState } from "react";
import "./LandingPageDashboard.css";
import {
  AuditOutlined,
  BarChartOutlined,
  BookOutlined,
  ContainerOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "../Image/logo-svcc.png";
import ManageBook from "./ManageBook.js";
import BookReport from "./BookReport.js";
import AuditTrail from "./AuditTrail.js";
import BookShelves from "./BookShelves.js";

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
            <BookOutlined className="btn-side-icon" />
            Manage Book
          </button>
          <button
            className={activeSection === "manageUser" ? "active" : ""}
            onClick={() => handleButtonClick("manageUser")}
          >
            <UserOutlined className="btn-side-icon" />
            Manage User
          </button>
          <button
            className={activeSection === "bookReport" ? "active" : ""}
            onClick={() => handleButtonClick("bookReport")}
          >
            <BarChartOutlined className="btn-side-icon" />
            Book Report
          </button>
          <button
            className={activeSection === "auditTrail" ? "active" : ""}
            onClick={() => handleButtonClick("auditTrail")}
          >
            <AuditOutlined className="btn-side-icon " />
            Audit Trail
          </button> <button
            className={activeSection === "bookShelves" ? "active" : ""}
            onClick={() => handleButtonClick("bookShelves")}
          >
            <ContainerOutlined className="btn-side-icon " />
           Book shelf
          </button>

        </div>
      </div>
      <div className="categories-container">
        {activeSection === "manageBook" && <ManageBook />}
        {activeSection === "manageUser" && <div>Manage User Content</div>}
        {activeSection === "bookReport" && <BookReport />}
        {activeSection === "auditTrail" && <AuditTrail />}
        {activeSection === "bookShelves" && <BookShelves />}
      </div>
    </div>
  );
};

export default LandingPageDashboard;
