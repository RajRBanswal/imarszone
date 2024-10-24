import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const path = window.location.pathname;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-0 py-1 websiteNavbar">
      <div className="container-xl">
        {/* <!-- Logo --> */}
        <Link className="navbar-brand" to="#">
          {/* <h1 className="text-white">I Mars Zone</h1> */}
          <img src={"./assets/img/logo.png"} className="w-100" alt="..." />
        </Link>
        {/* <!-- Navbar toggle --> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <!-- Collapse --> */}
        <div className="collapse navbar-collapse" id="navbarCollapse">
          {/* <!-- Nav --> */}
          <div className="navbar-nav ms-lg-auto">
            <Link
              className={
                path === "/" ? "nav-item nav-link active" : "nav-item nav-link"
              }
              to="/"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              className={
                path === "/about"
                  ? "nav-item nav-link active"
                  : "nav-item nav-link"
              }
              to="/about"
            >
              About
            </Link>
            <Link
              className={
                path === "/contact"
                  ? "nav-item nav-link active"
                  : "nav-item nav-link"
              }
              to="/contact"
            >
              Conact
            </Link>
            <Link
              className={
                path === "/login"
                  ? "nav-item nav-link active"
                  : "nav-item nav-link"
              }
              to="/login"
            >
              Login
            </Link>
            <Link
              to="/user-register"
              className={
                path === "/user-register"
                  ? "nav-item nav-link active"
                  : "nav-item nav-link"
              }
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
