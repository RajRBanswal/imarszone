import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { url } from "../apiHelper/apiHelper";
import Navbar from "../website/Navbar";
import Footer from "../website/Footer";
const bgImage = "./assets/img/illustrations/illustration-signup.jpg";

const UserRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const mobileRef = useRef(null);

  const storeUser = async () => {
    if (!name || !mobile || !password || !email) {
      alert("Filled all mandatory fields");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("image", image);
      formData.append("password", password);
      const response = await fetch(`${url}/api/users/user-register`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.status === 200) {
        alert(result.result);
        navigate("/users");
      } else {
        alert(result.result);
      }
    }
  };
  const getMobile = (mobileN) => {
    if (mobileN.length > 9 && mobileN.length < 11) {
      setMobile(mobileN);
    } else {
      mobileRef.current.focus();
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="page-header align-items-start min-vh-100"
        style={{
          backgroundImage: `url(
            "https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
          )`,
        }}
      >
        <div className="container py-5">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 m-auto">
              <div className="card login-card ">
                <div className="card-body px-4">
                  <div className=" pb-3 pe-1">
                    <h3 className="text-white font-weight-bolder text-center mb-0">
                      User Register
                    </h3>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-12 col-md-12">
                      <label className="form-label">
                        Name <span className="text-danger fw-bold">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-lg-6 col-12 col-md-6">
                      <label className="form-label">
                        Email {""}
                        <span className="text-danger fw-bold">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-6 col-12 col-md-6">
                      <label className="form-label">
                        Mobile No.{" "}
                        <span className="text-danger fw-bold">*</span>
                      </label>
                      <input
                        ref={mobileRef}
                        type="number"
                        className="form-control"
                        placeholder="Enter Mobile No."
                        onChange={(e) => getMobile(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-lg-12 col-12 col-md-12">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Address"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-lg-6 col-12 col-md-6">
                      <label className="form-label">
                        Password <span className="text-danger fw-bold">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-6 col-12 col-md-6">
                      <label className="form-label">
                        Confirm Password{" "}
                        <span className="text-danger fw-bold">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Confirm Password"
                        onChange={(e) => setCPassword(e.target.value)}
                      />
                    </div>
                    {password !== "" && password === cPassword ? (
                      <p className="text-success fw-bold">Password matched</p>
                    ) : password === "" ? (
                      ""
                    ) : (
                      <p className="text-danger fw-bold">
                        Password not matched
                      </p>
                    )}
                  </div>
                  <div className="row mt-1">
                    <div className="col-lg-12 col-12 col-md-12">
                      <label className="form-label">Profile Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => storeUser()}
                      type="button"
                      className="btn btn-info w-50 mt-4 mb-0 text-white"
                      disabled={
                        password !== "" && password === cPassword ? false : true
                      }
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
                <div className=" text-center pt-0 px-lg-2 px-1 footerText">
                  <p className="mt-2 mb-3 mx-auto fw-bold">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary text-gradient font-weight-bold"
                    >
                      Login Now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserRegister;
