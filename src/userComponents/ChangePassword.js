import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../apiHelper/apiHelper";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [newCPassword, setNewCPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

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
  }, [userId]);
  

  const changePasswordNow = async () => {
    if (oldPassword === userData.stringPassword) {
      const response = await fetch(`${url}/api/users/change-password`, {
        method: "post",
        body: JSON.stringify({ userId, newPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 201) {
        alert(`${newPassword} Update Changed Successfully`);
        navigate("/users");
      } else {
        setUserData("");
      }
    } else {
      alert(`Old Password Not Matched! Try Again`);
    }
  };
  return (
    <div className="container my-auto">
      <div className="row">
        <div className="col-lg-6 col-md-8 col-12 mx-auto">
          <div className="card fadeInBottom bg-light">
            <div className="card-body px-4">
              <div className=" pb-3 pe-1">
                <h4 className="font-weight-bolder text-center mb-0">
                  Change Password
                </h4>
              </div>
              <div className="input-group input-group-outline my-3">
                {/* <label className="form-label">Email</label> */}
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Old Password"
                />
              </div>
              <div className="input-group input-group-outline mb-3">
                {/* <label className="form-label">Password</label> */}
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                />
              </div>
              <div className="input-group input-group-outline mb-3">
                {/* <label className="form-label">Password</label> */}
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setNewCPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn bg-gradient-primary w-50 my-4 mb-2"
                  disabled={newPassword === newCPassword ? false : true}
                  onClick={() => changePasswordNow()}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
