import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import { url } from "../apiHelper/apiHelper";

const UserLayout = () => {
  const navigate = useNavigate();
  const [sidebarOn, setSidebarOn] = useState(true);
  const userName = localStorage.getItem("userName");
  let userId = localStorage.getItem("userId");
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const [walletData, setWalletData] = useState([]);
  const getWalletData = async () => {
    const response = await fetch(`${url}/api/users/users-wallet`, {
      method: "post",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
   
    if (data.status === 200) {
      setWalletData(data.result);
    } else {
      setWalletData([]);
    }
  };
  const getTotal = () => {
    let total = 0;
    walletData.map((item) => {
      if (item.type === "Credit") {
        total += item.amount;
      } else if (item.type === "Debit") {
        total -= item.amount;
      }
    });
    return total;
  };

  useEffect(() => {
    getWalletData();
  }, [userId]);

  return (
    <div>
      <UserSidebar sidebarOn={sidebarOn} />
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
                <Link
                  to="/users/users-wallet"
                  className="btn btn-primary"
                >
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
                  <i className="fa fa-user me-sm-1"></i> {userName}
                </Link>

                <ul
                  className="dropdown-menu dropdown-menu-end shadow px-2 py-3 me-sm-n4"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li className="mb-2">
                    <Link
                      className="dropdown-item border-radius-md"
                      to="/users/user-profile"
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
    </div>
  );
};

export default UserLayout;
