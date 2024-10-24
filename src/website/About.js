import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <section id="about-section" class="about-section text-center py-5">
        <div class="container py-5">
          <h1>About Us</h1>
          <p class="lead">
            Welcome to our I Mars Zone MLM platform! We provide buyers, sellers,
            and real estate professionals with the best tools and resources for
            a seamless property search experience.
          </p>
          <p>
            Our platform ensures accurate and up-to-date listings, helping you
            find your dream home or the ideal investment property.
          </p>
          <div class="row mt-5">
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card feature-card shadow-sm">
                <img
                  src={"./assets/img/ComprehensiveListings.jpg"}
                  class="card-img-top"
                  alt="Comprehensive Listings"
                />
                <div class="card-body">
                  <h5 class="card-title">Comprehensive Listings</h5>
                  <p class="card-text">
                    Explore thousands of property listings from top agents and
                    sellers.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card feature-card shadow-sm">
                <img
                  src={"./assets/img/advanced-google-search-blog.jpeg"}
                  class="card-img-top"
                  alt="Advanced Search Tools"
                />
                <div class="card-body">
                  <h5 class="card-title">Advanced Search Tools</h5>
                  <p class="card-text">
                    Filter properties by location, price, features, and more to
                    find exactly what you need.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card feature-card shadow-sm">
                <img
                  src={"./assets/img/consulting-expert-advice.jpg"}
                  class="card-img-top"
                  alt="Expert Support"
                />
                <div class="card-body">
                  <h5 class="card-title">Expert Support</h5>
                  <p class="card-text">
                    Our team of experts is here to assist you with any real
                    estate needs.
                  </p>
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

export default About;
