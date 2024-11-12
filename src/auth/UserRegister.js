import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { url } from "../apiHelper/apiHelper";
import Navbar from "../website/Navbar";
import Footer from "../website/Footer";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
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

  const [users, setUsers] = useState("");
  const [usersDialog, setUsersDialog] = useState(false);

  const storeUser = async () => {
    if (mobile.toString().length < 10 || mobile.toString().length > 10) {
      alert("Enter 10 digit valid mobile number!");
    } else {
      if (!name || !password) {
        alert("Filled all mandatory fields");
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("mobile", mobile);
        // formData.append("email", email);
        // formData.append("address", address);
        // formData.append("image", image);
        formData.append("password", password);
        const response = await fetch(`${url}/api/users/user-register`, {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        if (result.status === 200) {
          // alert(result.result);
          openDialog(result.user);
          // navigate("/login");
        } else {
          alert(result.result);
        }
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

  const openDialog = (rowData) => {
    setUsers(rowData);
    setUsersDialog(true);
  };

  const hideDialog = () => {
    setUsersDialog(false);
    navigate("/login");
  };

  const DialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="me-1"
        severity="danger"
        onClick={() => hideDialog()}
      />
      <Button
        label="Ok"
        icon="pi pi-check"
        className="ms-1"
        onClick={() => navigate("/login")}
      />
    </React.Fragment>
  );

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
                    {/* <div className="col-lg-6 col-12 col-md-6">
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
                    </div> */}
                    <div className="col-lg-12 col-12 col-md-12">
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
                  {/* <div className="row mt-1">
                    <div className="col-lg-12 col-12 col-md-12">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Address"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div> */}
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
                  {/* <div className="row mt-1">
                    <div className="col-lg-12 col-12 col-md-12">
                      <label className="form-label">Profile Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                  </div> */}
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

        <Dialog
          visible={usersDialog}
          style={{ width: "40rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Login Details"
          modal
          className="p-fluid"
          footer={DialogFooter}
          onHide={hideDialog}
        >
          <div class="container py-2">
            <p>
              <strong>Dear {users.name},</strong>
            </p>
            <p className="mb-2">
              Welcome to I Mars Zone – the platform that turns your creativity
              into rewards!
            </p>
            <p className="mb-2">
              We're excited to have you on board and would like to extend our
              heartfelt congratulations on completing your registration.
            </p>
            <p className="mb-2">
              We're delighted to have you with us and can't wait for you to
              discover everything we have to offer.
            </p>
            <p className="mb-2">
              We're thrilled to have you in our community and can't wait to see
              the incredible video content you have in store for us.
            </p>
            <p className="mb-2 text-center text-dark">
              <strong>User ID:</strong> {users._id}
            </p>
            <p className="mb-2 text-center text-dark">
              <strong>UserName:</strong> {users.mobile}
            </p>
            <p className="mb-2 text-center text-dark">
              <strong>Password:</strong> {users.password}
            </p>
            <p class="important">
              Important: Do not provide your login and password to anyone!
            </p>
          </div>
        </Dialog>
      </div>
      <Footer />
    </>
  );
};

export default UserRegister;
