import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import { url } from "../apiHelper/apiHelper";

const UserLayout = () => {
  const navigate = useNavigate();
  const [sidebarOn, setSidebarOn] = useState(true);
  const userName = localStorage.getItem("userName");
  let userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState([]);

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

  useEffect(() => {
    getUserProfile();
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
      if (item.type === "Credit" && item.amountStatus === "Done") {
        total += item.amount;
      } else if (item.type === "Debit" && item.amountStatus === "Done") {
        total -= item.amount;
      }
    });
    return total;
  };

  useEffect(() => {
    getWalletData();
  }, [userId]);

  const handleContextMenu = (e) => {
    e.preventDefault();
  };
  return (
    <div onContextMenu={handleContextMenu}>
      <UserSidebar sidebarOn={sidebarOn} />
      <main className="main-content border-radius-lg">
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-lg-2 mx-0 py-3 mt-lg-1 mt-0 bg-gradient-dark shadow-none"
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
              <li className="nav-item d-lg-flex align-items-center justify-content-end py-0">
                {userData.kycstatus === "Done" ? (
                  <p className="mb-0 me-5">
                    <img
                      src={"./assets/img/success.png"}
                      width={50}
                      className="me-2"
                    />
                    <small className="text-white fw-bold">Active</small>
                  </p>
                ) : (
                  <strong className="text-white">
                    <img
                      src={"./assets/img/fail.png"}
                      width={40}
                      className="me-5"
                    />
                    Inactive
                  </strong>
                )}
              </li>
              <li className="nav-item d-none d-lg-flex align-items-center justify-content-end py-0">
                {userData.kycstatus === "Done" ? (
                  <Link to="/users/users-wallet" className="btn btn-warning">
                    My Wallet : <i className="fa fa-rupee"></i> {getTotal()}
                  </Link>
                ) : (
                  <strong className="text-white">
                    <img
                      src={"./assets/img/fail.png"}
                      width={40}
                      className="me-5"
                    />
                    Please Purchase Package to Earn Money
                  </strong>
                )}
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
                  {/* <li className="mb-2">
                    <Link
                      className="dropdown-item border-radius-md"
                      to="/users/user-profile"
                    >
                      <p className="text-xs text-dark mb-0">
                        <i className="fa fa-user me-1"></i>
                        User Profile
                      </p>
                    </Link>
                  </li> */}
                  <li className="mb-2">
                    <Link
                      className="dropdown-item border-radius-md"
                      to="/users/change-password"
                    >
                      <p className="text-xs text-dark mb-0">
                        <i className="fa fa-user me-1"></i>
                        Change Password
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
