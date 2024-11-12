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
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
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
      console.log(result.result);

      setUsers(result.result);
    } else {
      setUsers(result.result);
    }
  };

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

  const [allUsers, setAllUsers] = useState("");
  useEffect(() => {
    referAndEarn(userId);

    const getUsers = async () => {
      const response = await fetch(`${url}/api/admin/all-users`);
      const result = await response.json();
      if (result.status === 200) {
        setAllUsers(result.result);
      } else {
        setAllUsers(result.result);
      }
    };
    getUsers();
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
      } else if (
        selectedPackage === "Petrol Card + 500 Load + Gift Card (50/Referral)"
      ) {
        packageId = 102;
      } else {
        packageId = 103;
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

  const [walletData, setWalletData] = useState([]);
  const getWalletData = async () => {
    const response = await fetch(`${url}/api/users/users-wallet`, {
      method: "post",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.status === 200) {
      setWalletData(data.result);
    } else {
      setWalletData([]);
    }
  };
  const getTotal = () => {
    let total = 0;
    walletData.map((item) => {
      if (item.type === "Credit" && item.amountStatus === "Done") {
        total += item.amount;
      } else if (item.type === "Debit" && item.amountStatus === "Done") {
        total -= item.amount;
      }
    });
    return total;
  };

  const getTotalIncome = () => {
    let total = 0;
    walletData.forEach((item) => {
      if (
        item.type === "Credit" &&
        item.amountStatus === "Done" &&
        item.reason.includes("Refer") // Corrected method name
      ) {
        total += item.amount;
      } else if (
        item.type === "Credit" &&
        item.amountStatus === "Pending" &&
        item.reason.includes("Refer") // Corrected method name
      ) {
        total += item.amount;
      }
    });
    return total;
  };

  const getActive = () => {
    let total = 0;
    walletData.map((item) => {
      if (
        item.type === "Credit" &&
        item.amountStatus === "Done" &&
        item.reason.includes("Refer")
      ) {
        total += item.amount;
      }
    });
    return total;
  };

  const getInactive = () => {
    let total = 0;
    walletData.map((item) => {
      if (
        item.type === "Credit" &&
        item.amountStatus === "Pending" &&
        item.reason.includes("Refer")
      ) {
        total += item.amount;
      }
    });
    return total;
  };

  useEffect(() => {
    getUserProfile();
    getAllUsers();
    getWalletData();
  }, [userId]);

  useEffect(() => {
    let active = [];
    let inactive = [];
    users &&
      users.map((item) => {
        // Check if both dates represent the same day
        if (item.kycstatus === "Done") {
          active.push(item);
        } else if (item.kycstatus === "Pending") {
          inactive.push(item);
        }
      });
    setInactiveUsers(inactive);
    setActiveUsers(active);
  }, [users]);

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
        <div className="col-lg-12 col-sm-12">
          <marquee className="marqueeTag">
            Rewards : Complete 10 Directs within 15 days to get this rewards.
            You Required 10 Directs Active Ids to Get Prepaid cum ATM (Magic
            Card) Reward.
          </marquee>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-3">
          <div className="card my-3 border-2" style={{ background: "#fff" }}>
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-success border-1 shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="fa fa-user"></i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-2 text-capitalize">User ID Number</h5>
              </div>
              {userData.packageName === undefined ||
              userData.packageName === "" ? (
                <p className="fw-bold mb-0 text-red text-end">{userData._id}</p>
              ) : (
                <p className="fw-bold mb-0 text-success text-end">
                  {userData._id}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-3">
          <div className="card my-3" style={{ backgroundColor: "#500054" }}>
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-white border-1 shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="">
                  {userData.kycstatus === "Done" ? (
                    <img
                      src={"./assets/img/success.png"}
                      width={50}
                      className="m-auto"
                    />
                  ) : (
                    <img
                      src={"./assets/img/fail.png"}
                      width={50}
                      className="m-auto"
                    />
                  )}
                </i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-2 text-capitalize text-white">
                  Package Status
                </h5>
              </div>
              {userData.packageName === undefined ||
              userData.packageName === "" ? (
                <h4 className="mb-0 text-white text-end">Not Buy</h4>
              ) : (
                <>
                  {/* <h5 className="mb-0 text-white text-end">Active</h5> */}
                  <p className="fw-bold mb-0 text-white text-end">
                    {userData.packageName}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-3">
          <div className="card my-3 bg-danger">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person_add</i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-0 text-white">Total Team (Company)</h5>
              </div>
              <h4 className="mb-0 text-white text-end">{allUsers.length}</h4>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-3">
          <div className="card my-3 bg-primary">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="fa fa-rupee"></i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-0 text-white">My Total Income</h5>
              </div>
              <h4 className="mb-0 text-white text-end">
                <i className="fa fa-rupee"></i> {getTotalIncome()}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-3">
          <div className="card my-3 bg-warning">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="fa fa-rupee"></i>
              </div>
              <div className="text-end pt-1">
                <h5 className="mb-0 text-white">My Active Income</h5>
              </div>
              <h4 className="mb-0 text-white text-end">
                <i className="fa fa-rupee"></i> {getActive()}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-3">
          <div className="card my-3 bg-success">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-secondary shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="fa fa-rupee"></i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-0 text-white">My Inactive Income</h5>
              </div>
              <h4 className="mb-0 text-white text-end">
                <i className="fa fa-rupee"></i> {getInactive()}
              </h4>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-3">
          <div className="card my-3 bg-danger">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="fa fa-users"></i>
              </div>
              <div className="text-end pt-1">
                <h5 className="mb-2 text-capitalize text-white">
                  My Total Team
                </h5>
              </div>
              <h5 className="mb-0 text-white fw-bold text-end">
                {users.length}{" "}
                <Link
                  to="/users/my-team-level"
                  className="text-white ms-4"
                  style={{ fontSize: 14 }}
                >
                  Click Here...
                </Link>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-3">
          <div className="card my-3 bg-secondary">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person_add</i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-0 text-white">My Active Team</h5>
              </div>
              <h4 className="mb-0 text-white text-end">{activeUsers.length}</h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 mt-lg-0 mt-3">
          <div className="card my-3 bg-primary">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person_add</i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-0 text-white">My Inactive Team</h5>
              </div>
              <h4 className="mb-0 text-white text-end">
                {inactiveUsers.length}
              </h4>
            </div>
          </div>
        </div>
      </div>
      {userData.packageName === undefined || userData.packageName === "" ? (
        <div className="card p-3 mt-4" style={{ background: "#ffe9e9" }}>
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
                  <h5 className="text-primary">
                    Paithani Sarees + Petrol Card
                  </h5>
                  <h5 className="text-success">
                    <i className="fa fa-rupee"></i> 999
                  </h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => openNew("Paithani Sarees")}
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
                  <h5 className="text-primary">
                    Petrol Card with <i className="fa fa-rupee text-sm"></i>500
                    Load <br />+ Gift Card <br />
                    <small>
                      ( <i className="fa fa-rupee text-sm"></i>
                      50 * 10 Active Referral = 500 )
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
            <div className="col-lg-4 col-12">
              <div className="card h-100">
                <div className="card-body p-0">
                  <img
                    src={"./assets/img/web.jpg"}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <div className="card-footer text-center h-100">
                  <h5 className="text-primary">
                    Sanitary Napkin + Petrol Card
                  </h5>
                  <h5 className="text-success">
                    <i className="fa fa-rupee "></i> 999
                  </h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => openNew("Sanitary Napkin + Petrol Card")}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="card p-3 mt-5 shadow" style={{ background: "#ffe9e9" }}>
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
