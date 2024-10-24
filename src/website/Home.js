import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={"./assets/img/slider.jpg"}
              className="d-lg-block d-none w-100"
              alt="..."
            />
            <img
              src={"./assets/img/illustrations/illustration-signin.jpg"}
              className="d-lg-none d-block w-100"
              alt="..."
            />

            <div className="item-caption">
              <div className="container">
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-7 px-lg-4 p-1">
                    <h3>
                      We Look forward to seriving you and being a part of your
                      everyday life
                    </h3>
                    <h1>I Mars Zone</h1>
                    <p>
                      Our Mission is to marketplace that not only meets but
                      exceeds customer expectations.
                    </p>
                    <Link to="/login" className="btn btn-info">
                      Login
                    </Link>
                  </div>
                  <div className="col-lg-5 px-lg-4 p-1">
                    <img
                      src={"./assets/img/slider_caption.png"}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={"./assets/img/slider.jpg"}
              className="d-lg-block d-none w-100"
              alt="..."
            />
            <img
              src={"./assets/img/illustrations/illustration-signin.jpg"}
              className="d-lg-none d-block w-100"
              alt="..."
            />
            <div className="item-caption">
              <div className="container">
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-7 px-lg-4 p-1">
                    <h3>
                      We Look forward to seriving you and being a part of your
                      everyday life
                    </h3>
                    <h1>I Mars Zone</h1>
                    <p>
                      Our Mission is to marketplace that not only meets but
                      exceeds customer expectations.
                    </p>
                    <Link to="/login" className="btn btn-info">
                      Login
                    </Link>
                  </div>
                  <div className="col-lg-5 px-lg-4 p-1">
                    <img
                      src={"./assets/img/slider_caption2.png"}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section id="about-section" class="about-section py-5">
        <div class="container py-5">
          <div className="section-title text-center w-80 m-auto mb-5">
            <h1>About Us</h1>
            <p>
              "Welcome to I Mars Zone, our MLM platform! We provide buyers,
              sellers, and real estate professionals with the best tools and
              resources for a seamless property search experience."
            </p>
          </div>

          <div className="row">
            <div class="col-lg-6 col-md-6 mb-4">
              <img
                src={"./assets/img/consulting-expert-advice.jpeg"}
                class="card-img-top"
                alt="Expert Support"
              />
            </div>
            <div class="col-lg-6 col-md-6 mb-4">
              <p>
                Our platform ensures accurate and up-to-date listings, helping
                you find your dream home or the ideal investment property.
              </p>
              <div class="card-body">
                <h5 class="card-title">Expert Support</h5>
                <p class="card-text">
                  Our team of experts is here to assist you with any real estate
                  needs.
                </p>
              </div>
              <div class="card-body">
                <h5 class="card-title">Comprehensive Listings</h5>
                <p class="card-text">
                  Explore thousands of property listings from top agents and
                  sellers.
                </p>
              </div>
              <div class="card-body">
                <h5 class="card-title">Advanced Search Tools</h5>
                <p class="card-text">
                  Filter properties by location, price, features, and more to
                  find exactly what you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="position-relative bg-dark maginCard">
        <div className="container py-5">
          <h1 class="pricing-title text-dark   text-center">Magic Cards</h1>
          <div class="pricing-table py-5">
            <div class="card w-60 p-0 bg-info m-auto rounded">
              <div className="row  align-items-center">
                <div className="col-lg-5 ">
                  <img
                    src={"./assets/img/petrolcard.png"}
                    className="rounded-start"
                    width={"100%"}
                  />
                </div>
                <div className="col-lg-7 text-white">
                  <h2 class="text-white">Petrol Cards</h2>
                  <p>
                    "Get a Free Petrol Card on Your Registration! Sign up now
                    and receive a complimentary petrol card. Don’t miss out on
                    this exclusive offer—register today and start saving on
                    every mile!"
                  </p>
                  <Link
                    to={"/user-register"}
                    className="btn btn-white bg-white"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="background-animation"></div> */}
      <div class="position-relative">
        <div className="container py-5">
          <h1 class="pricing-title text-center">Rewards</h1>
          <div class="pricing-table py-5">
            <div class="pricing-plan">
              <div class="plan-features">
                <img src={"./assets/img/prepaid.jpg"} width={"100%"} />
              </div>
              <div class="plan-header">
                <h2 class="plan-title">Prepaid Card</h2>
                <p className="fw-bold">(10 Directs)</p>
              </div>
            </div>
            <div class="pricing-plan">
              <div class="plan-features">
                <img src={"./assets/img/1gramGold.jpg"} width={"100%"} />
              </div>
              <div class="plan-header">
                <h2 class="plan-title">1 Gram Gold</h2>
                <p className="fw-bold">(100 Directs)</p>
              </div>
            </div>
            <div class="pricing-plan">
              <div class="plan-features">
                <img src={"./assets/img/oneplus.png"} width={"100%"} />
              </div>
              <div class="plan-header">
                <h2 class="plan-title">One Plus Mobile</h2>
                <p className="fw-bold">(1000 Directs)</p>
              </div>
            </div>
          </div>
          <div class="pricing-table py-5 justify-content-center">
            <div class="pricing-plan">
              <div class="plan-features">
                <img src={"./assets/img/laptop.webp"} width={"100%"} />
              </div>
              <div class="plan-header">
                <h2 class="plan-title">Laptop</h2>
                <p className="fw-bold">(10000 Directs)</p>
              </div>
            </div>
            <div class="pricing-plan">
              <div class="plan-features  bg-white">
                <img src={"./assets/img/electric_bike.png"} width={"100%"} />
              </div>
              <div class="plan-header">
                <h2 class="plan-title">Electrical Bike</h2>
                <p className="fw-bold">(100000 Directs)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="contact-section text-center">
        <div className="container py-5">
          <h1>Contact us</h1>
          <div class="row mt-5">
            <div class="col-sm-12 col-md-5 pt-3">
              <div class="row text-center">
                <div class="col-md-12">
                  <div className="card px-3 py-4">
                    <button className="btn btn-warning m-auto mb-3 btn-lg w-25">
                      <i class="fa fa-map-marker"></i>
                    </button>
                    <p className="mb-0 fw-bold">
                      Aurangabad, Maharashtra, India{" "}
                    </p>
                  </div>
                </div>
                <div class="col-md-12 mt-4">
                  <div className="card px-3 py-4">
                    <button className="btn btn-warning m-auto mb-3 btn-lg w-25">
                      <i class="fa fa-phone"></i>
                    </button>
                    <p className="mb-0 fw-bold">+91-9999999999</p>
                  </div>
                </div>
                <div class="col-md-12 mt-4">
                  <div className="card px-3 py-4">
                    <button className="btn btn-warning m-auto mb-3 btn-lg w-25">
                      <i class="fa fa-envelope"></i>
                    </button>
                    <p className="mb-0 fw-bold">info@imarszone.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 mb-4 col-md-7 px-5">
              <div class="card border-primary rounded-0">
                <div class="card-body p-4 text-start">
                  <div class="form-group">
                    <label> Your name </label>
                    <div class="input-group">
                      <input
                        value=""
                        type="text"
                        name="data[name]"
                        class="form-control"
                        id="inlineFormInputGroupUsername"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label> Your Mobile No. </label>
                    <div class="input-group">
                      <input
                        value=""
                        type="number"
                        name="data[mobile]"
                        class="form-control"
                        id="inlineFormInputGroupMobile"
                        placeholder="Your Mobile No."
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Your email</label>
                    <div class="input-group mb-2 mb-sm-0">
                      <input
                        type="email"
                        value=""
                        name="data[email]"
                        class="form-control"
                        id="inlineFormInputGroupUsername"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Subject</label>
                    <div class="input-group mb-2 mb-sm-0">
                      <input
                        type="text"
                        name="data[subject]"
                        class="form-control"
                        id="inlineFormInputGroupUsername"
                        placeholder="Subject"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Message</label>
                    <div class="input-group mb-2 mb-sm-0">
                      <input type="text" class="form-control" name="mesg" placeholder="Write Message" />
                    </div>
                  </div>
                  <div class="text-center mt-4">
                    <input
                      type="submit"
                      name="submit"
                      value="submit"
                      class="btn btn-primary btn-block rounded-0 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
