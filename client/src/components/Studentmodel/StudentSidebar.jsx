import React, { useState } from "react";
import "./../../styles/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../reducers/Reducers.js";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("loginid");
    localStorage.removeItem("usertype");
    localStorage.removeItem("token");
    dispatch(setProfileData(null));
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <i className="fa-solid fa-graduation-cap"></i>
        <span>EduAdmin</span>
      </div>

      <nav className="menu">
        <div className="menu-title">Student Management</div>

        <Link
          to="/dashboard"
          onClick={() => setActiveMenu("dashboard")}
          className={`menu-item ${
            activeMenu === "dashboard" ? "active" : ""
          }`}
        >
          <i className="fa-solid fa-users"></i>
          <span>View & Update Profile</span>
        </Link>


  

        <button className="menu-item logout-btn" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span className="logout-btn">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
