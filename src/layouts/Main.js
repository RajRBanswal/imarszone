import React, { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { url } from "../apiHelper/apiHelper";

const Main = () => {
  const navigate = useNavigate();
  const [sidebarOn, setSidebarOn] = useState(true);
  const adminName = localStorage.getItem("adminName");
  const urls = window.location.pathname;

  const [filterData, setFilterData] = useState([]);
  const getAdminWalletData = async () => {
    let all_rent_chages = await fetch(`${url}/api/admin/admin-wallet`);
    const allCharge = await all_rent_chages.json();
    if (allCharge.status === 200) {
      setFilterData(allCharge.result);
    } else {
      alert(allCharge.result);
    }
  };

  useEffect(() => {
    getAdminWalletData();
    let adminId = localStorage.getItem("adminId");
    if (!adminId) {
      navigate("/admin-login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminName");
    navigate("/admin-login");
  };

  const getTotal = () => {
    let total = 0;
    filterData.map((item) => {
      if (item.type === "Credit" && item.amountStatus === "Done") {
        total += parseInt(item.amount);
      } else if (item.type === "Debit" && item.amountStatus === "Done") {
        total -= parseInt(item.amount);
      }
    });
    return total;
  };

  return (
    <>
      <aside
        className={
          sidebarOn === true
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
            onClick={() => setSidebarOn(!sidebarOn)}
          ></i>
          <div className="text-center py-2">
            <img
              src={"./assets/img/logo.png"}
              alt=""
              width={150}
              style={{ maxHeight: "105px" }}
            />
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
                  urls === "/admin"
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
              <Link
                className={
                  urls === "/admin/admin-wallet"
                    ? "nav-link text-white bg-gradient-primary active"
                    : "nav-link text-white"
                }
                to="/admin/admin-wallet"
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">wallet</i>
                </div>
                <span className="nav-link-text">Admin Wallet</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={
                  urls === "/admin/all-users"
                    ? "nav-link text-white bg-gradient-primary active"
                    : "nav-link text-white"
                }
                to="/admin/all-users"
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">persons</i>
                </div>
                <span className="nav-link-text">All Users</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={
                  urls === "/admin/reward-point-calculator"
                    ? "nav-link text-white bg-gradient-primary active"
                    : "nav-link text-white"
                }
                to="/admin/reward-point-calculator"
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="fa fa-coins"></i>
                </div>
                <span className="nav-link-text ms-1">Reward Point Calci</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={
                  urls === "/admin/all-registered-users-with-reference"
                    ? "nav-link text-white bg-gradient-primary active"
                    : "nav-link text-white"
                }
                to="/admin/all-registered-users-with-reference"
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i class="fa fa-list"></i>
                </div>
                <span className="nav-link-text ms-1">Users with Reference</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  urls === "/admin/package-purchase-request"
                    ? "nav-link text-white bg-gradient-primary active"
                    : "nav-link text-white"
                }
                to="/admin/package-purchase-request"
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="fa fa-coins"></i>
                </div>
                <span className="nav-link-text ms-1">
                  Package Purchase Request
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={
                  urls === "/admin/users-withdraw-request"
                    ? "nav-link text-white bg-gradient-primary active"
                    : "nav-link text-white"
                }
                to="/admin/users-withdraw-request"
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i class="fa fa-money"></i>
                </div>
                <span className="nav-link-text ms-1">All Withdraw Request</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={
                  urls === "/admin/users-topup-request"
                    ? "nav-link text-white bg-gradient-primary active"
                    : "nav-link text-white"
                }
                to="/admin/users-topup-request"
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">notifications</i>
                </div>
                <span className="nav-link-text ms-1">All TopUp Request</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="main-content border-radius-lg">
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-lg-2 mx-0 py-3 mt-lg-1 mt-0 bg-dark shadow-none"
          id="navbarBlur"
          data-scroll="true"
        >
          <div
            className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0"
            id="navbar"
          >
            <ul className="navbar-nav-main w-100 justify-content-between align-items-center">
              <li className="nav-item  align-items-center">
                <Link
                  to="javascript:;"
                  className="nav-link p-2 text-white bg-white ms-lg-2 d-inline-flex"
                  id="iconNavbarSidenav"
                  onClick={() => setSidebarOn(!sidebarOn)}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                  </div>
                </Link>
              </li>
              <li className="nav-item  align-items-center justify-content-end">
                <Link to="/admin/admin-wallet" className=" btn btn-primary">
                  <i className="fa fa-wallet"></i> {getTotal()}
                </Link>
              </li>
              <li className="nav-item dropdown pe-2 d-flex justify-content-end align-items-center">
                <Link
                  to="javascript:;"
                  className="nav-link text-white p-0 fw-bold"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontSize: "18px" }}
                >
                  <i className="fa fa-user me-sm-1"></i> {adminName}
                </Link>

                <ul
                  className="dropdown-menu dropdown-menu-end shadow px-2 py-3 me-sm-n4"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li className="mb-2">
                    <Link
                      className="dropdown-item border-radius-md"
                      to="javascript:;"
                    >
                      <p className="text-xs text-dark mb-0">
                        <i className="fa fa-user me-1"></i>
                        User Profile
                      </p>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="dropdown-item border-radius-md"
                      to="javascript:;"
                      onClick={() => logout()}
                    >
                      <p className="text-xs text-dark mb-0">
                        <i className="fa fa-clock me-1"></i>Logout
                      </p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container-fluid py-4">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Main;
