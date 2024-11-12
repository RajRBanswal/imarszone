import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../apiHelper/apiHelper";
import Footer from "../website/Footer";
import Navbar from "../website/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getLogin = async () => {
    if (!username || !password) {
      alert("Enter username or password");
    } else {
      const response = await fetch(`${url}/api/users/user-login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status === 200) {
        localStorage.setItem("userId", result.user[0]._id);
        localStorage.setItem("userName", result.user[0].name);
        localStorage.setItem("userEmail", result.user[0].email);

        alert("User logged in successfully");
        navigate("/users");
      } else {
        alert(result.result);
      }
    }
  };
  return (
    <div>
      <Navbar />
      <div
        className="page-header align-items-start min-vh-100"
        style={{
          backgroundImage: `url(
            "https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
          )`,
        }}
      >
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-12 mx-auto">
              <div className="card login-card bg-transparent py-4 z-index-0 fadeIn3 fadeInBottom">
                <div className="card-body px-4">
                  <div className=" pb-3 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mb-0">
                      Sign in
                    </h4>
                  </div>
                  <form role="form" className="text-start">
                    <div className="input-group input-group-outline my-3">
                      {/* <label className="form-label">Email</label> */}
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Mobile Number"
                      />
                    </div>
                    <div className="input-group input-group-outline mb-3">
                      {/* <label className="form-label">Password</label> */}
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                    </div>
                    <div className="text-right mt-3 footerText">
                      <p className="fw-bold">
                        <Link
                          className=""
                          to="#"
                          onClick={() =>
                            alert(
                              "If you forget your password, please contact the administrator for assistance."
                            )
                          }
                        >
                          Forget Password?
                        </Link>
                      </p>
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn bg-gradient-primary w-50 my-2 mb-2"
                        onClick={() => getLogin()}
                      >
                        Sign in
                      </button>
                    </div>
                  </form>

                  <div className="text-center mt-3 footerText">
                    <p className="fw-bold">
                      Don`t have an account?{" "}
                      <Link className="" to="/user-register">
                        Register Here
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
