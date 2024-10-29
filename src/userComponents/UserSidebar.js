import { Image } from "primereact/image";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../apiHelper/apiHelper";

const UserSidebar = ({ sidebarOn }) => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(null);
  const urls = window.location.pathname;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserProfile = async () => {
    const response = await fetch(`${url}/api/users/user-profile`, {
      method: "post",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      setUserData(data.result);
    } else {
      setUserData("");
    }
  };

  //   console.log(userData);

  useEffect(() => {
    getUserProfile();
  }, [urls]);

  useEffect(() => {
    setSidebarVisible(sidebarOn);
  }, [sidebarOn]);

  return (
    <aside
      className={
        sidebarVisible === true
          ? "sidenav navbar navbar-vertical navbar-expand-xs z-index-1 my-1 fixed-start ms-1 bg-gradient-dark d-block"
          : "sidenav navbar navbar-vertical navbar-expand-xs d-none"
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
        <div className="text-center py-2">
          {userData && userData.profile_image ? (
            <img
              src={`${url}/uploads/${userData.profile_image}`}
              alt=""
              width={100}
              style={{ maxHeight: "105px" }}
            />
          ) : (
            <img
              src={"./assets/img/logo.png"}
              alt=""
              width={100}
              style={{ maxHeight: "105px" }}
            />
          )}
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
                urls === "/users"
                  ? "nav-link text-white active"
                  : "nav-link text-white"
              }
              to="/users"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">dashboard</i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={
                urls === "/users/user-profile"
                  ? "nav-link text-white active"
                  : "nav-link text-white"
              }
              to="/users/user-profile"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">person</i>
              </div>
              <span className="nav-link-text ms-1">Profile</span>
            </Link>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link text-white dropdown-toggle"
              href="#"
              id="teamsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-wallet"></i>
              </div>
              <span className="nav-link-text ms-1">Wallets</span>
            </a>
            <ul className="dropdown-menu" aria-labelledby="teamsDropdown">
              <li>
                <Link
                  className={
                    urls === "/users/users-wallet"
                      ? "dropdown-item ms-1 nav-link text-white active"
                      : "dropdown-item ms-1 nav-link text-white"
                  }
                  to="/users/users-wallet"
                >
                  <i className="fa fa-wallet ms-1"></i>Wallet
                </Link>
              </li>
              <li>
                <Link
                  className={
                    urls === "/users/gift-cashback-wallet"
                      ? "dropdown-item ms-1 nav-link text-white active"
                      : "dropdown-item ms-1 nav-link text-white"
                  }
                  to="/users/gift-cashback-wallet"
                >
                  <i className="fa fa-wallet ms-1"></i>Cashback Wallet
                </Link>
              </li>
              <li>
                <Link
                  className={
                    urls === "/users/petrol-card-wallet"
                      ? "dropdown-item ms-1 nav-link text-white active"
                      : "dropdown-item ms-1 nav-link text-white"
                  }
                  to="/users/petrol-card-wallet"
                >
                  <i className="fa fa-wallet mr-1"></i>Petrol Card Wallet
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link text-white dropdown-toggle"
              href="#"
              id="teamsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">send</i>
              </div>
              <span className="nav-link-text ms-1">Teams</span>
            </a>
            <ul className="dropdown-menu" aria-labelledby="teamsDropdown">
              <li>
                <Link
                  className={
                    urls === "/users/all-refer-to-users"
                      ? "dropdown-item ms-1 nav-link text-white active"
                      : "dropdown-item ms-1 nav-link text-white"
                  }
                  to="/users/all-refer-to-users"
                >
                  <i className="fa fa-list mr-1"></i> Genealogy Tree
                </Link>
              </li>
              <li>
                <Link
                  className={
                    urls === "/users/my-directs"
                      ? "dropdown-item ms-1 nav-link text-white active"
                      : "dropdown-item ms-1 nav-link text-white"
                  }
                  to="/users/my-directs"
                >
                  <i className="fa fa-users mr-1"></i> My Directs
                </Link>
              </li>
              <li>
                <Link
                  className={
                    urls === "/users/my-indirects"
                      ? "dropdown-item ms-1 nav-link text-white active"
                      : "dropdown-item ms-1 nav-link text-white"
                  }
                  to="/users/my-indirects"
                >
                  <i className="fa fa-users mr-1"></i> My Indirects
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link text-white dropdown-toggle"
              href="#"
              id="teamsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">print</i>
              </div>
              <span className="nav-link-text ms-1">Income Reports</span>
            </a>
            <ul className="dropdown-menu" aria-labelledby="teamsDropdown">
              <li>
                <Link
                  className={
                    urls === "/users/award-income"
                      ? "dropdown-item ms-1 nav-link text-white active"
                      : "dropdown-item ms-1 nav-link text-white"
                  }
                  to="/users/award-income"
                >
                  <i className="fa fa-list mr-1"></i> Award Income
                </Link>
              </li>
              <li>
                <Link
                  className={
                    urls === "/users/directs-refferal-bonus"
                      ? "dropdown-item ms-1 nav-link text-white active"
                      : "dropdown-item ms-1 nav-link text-white"
                  }
                  to="/users/directs-refferal-bonus"
                >
                  <i className="fa fa-users mr-1"></i> Directs Refferal Bonus
                </Link>
              </li>
              <li>
                <Link
                  className={
                    urls === "/users/level-bonus"
                      ? "dropdown-item ms-1 nav-link text-white active"
                      : "dropdown-item ms-1 nav-link text-white"
                  }
                  to="/users/level-bonus"
                >
                  <i className="fa fa-users mr-1"></i> Level Income
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className={
                urls === "/users/reports"
                  ? "nav-link text-white active"
                  : "nav-link text-white"
              }
              to="/users/reports"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-print"></i>
              </div>
              <span className="nav-link-text ms-1">Reports</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default UserSidebar;
