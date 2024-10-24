import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div>
      <Navbar />
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
                <div class="card-header p-0">
                  <div class="bg-primary text-white text-center py-2">
                    <h3 class="text-white mb-0">
                      <i class="fa fa-envelope"></i> Write to us:
                    </h3>
                  </div>
                </div>
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
                      <input type="text" class="form-control" name="mesg" />
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

export default Contact;
