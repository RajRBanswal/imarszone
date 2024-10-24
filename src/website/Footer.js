import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div class="pg-footer">
      <footer class="footer">
        <div className="container">
          <div class="footer-content">
            <div className="row">
              <div className="col-lg-4">
                <div class="footer-content-column">
                  <div class="footer-logo">
                    <Link class="footer-logo-link" to="/">
                      <img src={"./assets/img/logo.png"} width={"80%"} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div class="footer-content-column">
                  <div class="footer-menu">
                    <h2 class="footer-menu-name"> Useful Links</h2>
                    <ul id="menu-company" class="footer-menu-list">
                      <li class="menu-item menu-item-type-post_type menu-item-object-page">
                        <Link to="/">Home</Link>
                      </li>
                      <li class="menu-item menu-item-type-taxonomy menu-item-object-category">
                        <Link to="/about">About</Link>
                      </li>
                      <li class="menu-item menu-item-type-post_type menu-item-object-page">
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li class="menu-item menu-item-type-post_type menu-item-object-page">
                        <Link to="/login">Login</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div class="footer-content-column">
                  <div class="footer-menu">
                    <h2 class="footer-menu-name"> Contact Us</h2>
                    <ul id="menu-company" class="footer-menu-list">
                      <li class="menu-item menu-item-type-post_type menu-item-object-page">
                        <i className="fa fa-envelope"></i> : info@imarszone.com
                      </li>
                      <li class="menu-item menu-item-type-taxonomy menu-item-object-category">
                        <i className="fa fa-phone"></i> : +91-9999999999
                      </li>
                    </ul>
                    <div class="social-menu">
                      <ul>
                        <li>
                          <Link
                            to="#"
                            target="blank"
                          >
                            <i class="fab fa-facebook"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            target="blank"
                          >
                            <i class="fab fa-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            target="blank"
                          >
                            <i class="fab fa-linkedin-in"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i class="fab fa-twitter" target="blank"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="footer-copyright-wrapper">
            <p class="footer-copyright-text">
              <Link class="footer-copyright-link" to="#" target="_self">
                {" "}
                ©2024. | I Mars Zone | All rights reserved.{" "}
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
