import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOn }) => {
  const [sidebarVisible, setSidebarVisible] = useState(null);
  const url = window.location.pathname;

  useEffect(() => {
    setSidebarVisible(sidebarOn);
  }, [sidebarOn]);

  return (
    <aside
      className={
        sidebarVisible === true
          ? "sidenav navbar navbar-vertical navbar-expand-xs my-1 fixed-start ms-1 bg-gradient-dark d-block"
          : "d-none"
      }
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-block d-lg-none"
          aria-hidden="true"
          id="iconSidenav"
          onClick={() => setSidebarVisible(!sidebarVisible)}
        ></i>
        <div className="text-center">
          <h2 className="mb-0 text-white">MLM</h2>
          <Link
            className="navbar-brand mt-0 m-0 p-1"
            to="https://demos.creative-tim.com/material-dashboard/pages/dashboard"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ms-1 font-weight-bold text-white">
              Management System
            </span>
          </Link>
        </div>
      </div>

      <hr className="horizontal light mt-0 mb-2" />

      <div
        className="collapse navbar-collapse w-auto"
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className={
                url === "/admin"
                  ? "nav-link text-white bg-gradient-primary active"
                  : "nav-link text-white"
              }
              to="/admin"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">dashboard</i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/all-users">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">persons</i>
              </div>
              <span className="nav-link-text">All Users</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin/reward-point-calculator">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-coins"></i>
              </div>
              <span className="nav-link-text ms-1">Reward Point Calci</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link text-white"
              to="./pages/virtual-reality.html"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">view_in_ar</i>
              </div>
              <span className="nav-link-text ms-1">Virtual Reality</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="./pages/rtl.html">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">
                  format_textdirection_r_to_l
                </i>
              </div>
              <span className="nav-link-text ms-1">RTL</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link text-white"
              to="./pages/notifications.html"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">notifications</i>
              </div>
              <span className="nav-link-text ms-1">Notifications</span>
            </Link>
          </li>

          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">
              Account pages
            </h6>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="./pages/profile.html">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">person</i>
              </div>
              <span className="nav-link-text ms-1">Profile</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="./pages/sign-in.html">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">login</i>
              </div>
              <span className="nav-link-text ms-1">Sign In</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="./pages/sign-up.html">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">assignment</i>
              </div>
              <span className="nav-link-text ms-1">Sign Up</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
