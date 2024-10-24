import React, { useEffect, useRef, useState } from "react";
import { url } from "../apiHelper/apiHelper";
import CryptoJS from "crypto-js";
import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const UserDashboard = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([]);
  const [todaysUsers, setTodaysUsers] = useState([]);
  const [referMobile, setReferMobile] = useState("");
  const [referLink, setReferLink] = useState("");
  const [tempLink, setTempLink] = useState("");
  const [addDialog, setAddDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const ref = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const openNew = (value) => {
    setAddDialog(true);
    setSelectedPackage(value);
  };

  const hideDialog = () => {
    setAddDialog(false);
  };

  const getAllUsers = async () => {
    const response = await fetch(`${url}/api/users/all-refer-users`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.status === 200) {
      setUsers(result.result);
    } else {
      setUsers(result.result);
    }
  };

  useEffect(() => {
    getUserProfile();
    getAllUsers();
    let todays = [];
    users &&
      users.map((item) => {
        const itemDate = new Date(item.createdAt);
        const today = new Date();

        // Check if both dates represent the same day
        if (
          itemDate.getFullYear() === today.getFullYear() &&
          itemDate.getMonth() === today.getMonth() &&
          itemDate.getDate() === today.getDate()
        ) {
          todays.push(item);
        }
      });

    setTodaysUsers(todays);
  }, [userId]);

  const referAndEarn = (originalString) => {
    const secretKey = "imarszonechisecratekeyaahe"; // Keep this key secure

    // Encrypt the string
    const encryptedString = CryptoJS.AES.encrypt(
      originalString,
      secretKey
    ).toString();

    const encodedEncryptedString = encodeURIComponent(encryptedString);

    // Construct the refer URL with the encoded encrypted string
    let referUrl = `${url}/user-register-with-refer/${encodedEncryptedString}`;
    let referUrl2 = `${url}/user-register-with-refer/${encodedEncryptedString.substring(
      0,
      10
    )}`;
    setTempLink(referUrl2);
    setReferLink(referUrl);
  };

  useEffect(() => {
    referAndEarn(userId);
  }, []);

  const title = "Check this out!";
  const [screenshot, setScreenshot] = useState("");

  const buyPackage = async () => {
    if (!screenshot || !selectedPackage) {
      alert("Upload Payment success Screenshot");
      ref.current.focus();
    } else {
      let packageId = "";
      if (selectedPackage === "Paithani Sarees + Prepaid Card") {
        packageId = 101;
      } else {
        packageId = 102;
      }
      let amount = 999;
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("packageId", packageId);
      formData.append("packageName", selectedPackage);
      formData.append("packageAmount", amount);
      formData.append("screenshot", screenshot);

      const response = await fetch(`${url}/api/users/buy-package-request`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.status === 200) {
        alert(result.result);
        window.location.reload();
      } else {
        alert(result.result);
      }
    }
  };

  const AddPriceDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="me-1"
        severity="danger"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="ms-1"
        onClick={buyPackage}
      />
    </React.Fragment>
  );

  return (
    <div className="mainDashboard">
      <div className="row mt-1">
        <div className="col-lg-4 col-sm-6">
          <div className="card my-3 h-100">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="fa fa-key "></i>
              </div>
              <div className="text-end pt-1">
                <h4 className=" mb-0 text-capitalize text-white">Package Status</h4>
              </div>
            </div>

            <hr className="dark horizontal my-0" />
            <div className="card-footer p-3 text-end">
              {userData.packageName === undefined ||
              userData.packageName === "" ? (
                <h3 className="mb-0 text-white">Not Buy</h3>
              ) : (
                <>
                  <h5 className="mb-0 text-white">Active</h5>
                  <p className="fw-bold mb-0 text-white">{userData.packageName}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="card my-3 h-100">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person_add</i>
              </div>
              <div className="text-end pt-1">
                <h4 className="mb-0 text-capitalize text-white">Connected Users</h4>
              </div>
            </div>

            <hr className="dark horizontal my-0" />
            <div className="card-footer p-3 text-end">
              <h3 className="mb-0 text-white">{users.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="card my-3 h-100">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person_add</i>
              </div>
              <div className="text-end pt-1">
                <h4 className=" mb-0 text-capitalize text-white">Today's Users</h4>
              </div>
            </div>

            <hr className="dark horizontal my-0" />
            <div className="card-footer p-3 text-end">
              <h3 className="mb-0 text-white">{todaysUsers.length}</h3>
            </div>
          </div>
        </div>
      </div>
      {userData.packageName === undefined || userData.packageName === "" ? (
        <div className="card p-3 mt-4" style={{background:"#ffe9e9"}}>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-4 col-12">
              <div className="card h-100">
                <div className="card-body p-0">
                  <img
                    src={"./assets/img/web1.jpg"}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <div className="card-footer text-center h-100">
                  <h5 className="text-white">Paithani Sarees + Prepaid Card</h5>
                  <h5 className="text-success">
                    <i className="fa fa-rupee"></i> 999
                  </h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => openNew("Paithani Sarees + Prepaid Card")}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="card h-100">
                <div className="card-body p-0">
                  <img
                    src={"./assets/img/web2.jpg"}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <div className="card-footer text-center h-100">
                  <h5 className="text-white">
                    Petrol Card + <i className="fa fa-rupee text-sm"></i>500
                    Load + Gift Card{" "}
                    <small>
                      ( <i className="fa fa-rupee text-sm"></i>
                      50/Referral )
                    </small>
                  </h5>
                  <h5 className="text-success">
                    <i className="fa fa-rupee "></i> 999
                  </h5>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      openNew(
                        "Petrol Card + 500 Load + Gift Card (50/Referral)"
                      )
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-3 mt-5 shadow" style={{background:"#ffe9e9"}}>
          <div className="row align-items-center">
            <div className="col-lg-12 col-12">
              <b className="">Refferal Link :</b>{" "}
              <a className="refferalLink" target="_blank" href={referLink}>
                {tempLink}
              </a>
            </div>
            <div className="col-lg-12 col-12">
              <div className="row">
                <div className="col-lg-3 col-12">
                  <h3 className="font-weight-bolder mb-0">Refer and Earn : </h3>
                </div>
                <div className="col-lg-6 col-12 d-flex justify-content-between align-items-center">
                  <FacebookShareButton url={referLink} quote={title}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <WhatsappShareButton url={referLink} title={title}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <InstapaperShareButton url={referLink}>
                    <InstapaperIcon size={32} round />
                  </InstapaperShareButton>
                  <TelegramShareButton url={referLink}>
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                  <LinkedinShareButton url={referLink}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <TwitterShareButton url={referLink} title={title}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>
              </div>
              <hr className="mt-0" />
            </div>
          </div>
        </div>
      )}

      <Dialog
        visible={addDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={"Package Details"}
        modal
        className="p-fluid"
        footer={AddPriceDialogFooter}
        onHide={hideDialog}
      >
        <div className="row py-4">
          <div className="col-lg-12">
            <strong>Package Name :</strong> {selectedPackage}
          </div>
          <div className="col-lg-12 mt-3">
            <strong> Price :</strong> <i className="fa fa-rupee "></i> 999
          </div>
          <div className="col-lg-12 mt-3">
            <label>Payment Success Screenshot</label>
            <input
              ref={ref}
              type="file"
              className="form-control"
              onChange={(e) => setScreenshot(e.target.files[0])}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
