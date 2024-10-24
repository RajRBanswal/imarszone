import { Image } from "primereact/image";
import React, { useEffect, useState } from "react";
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

const UserProfile = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [PAN, setPAN] = useState("");
  const [PANName, setPANName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [referMobile, setReferMobile] = useState("");
  const [referLink, setReferLink] = useState("");
  const [tempLink, setTempLink] = useState("");

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
      setRefresh(false);
    } else {
      setUserData("");
    }
  };

  //   console.log(userData);

  useEffect(() => {
    getUserProfile();
    setRefresh(false);
  }, [refresh]);

  const uodateUserData = async () => {
    let formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", name ? name : "");
    formData.append("mobile", mobile ? mobile : "");
    formData.append("email", email ? email : "");
    formData.append("address", address ? address : "");
    formData.append("profile_image", image ? image : "");

    let response = await fetch(`${url}/api/users/update-users`, {
      method: "post",
      body: formData,
    });
    let res = await response.json();
    if (res.status === 201) {
      setRefresh(true);
      alert(res.result);
    } else {
      alert(res.result);
    }
  };

  const [KYCStatus, setKYCStatus] = useState("Pending");
  const [panVerifyStatus, setPANVerifyStatus] = useState(false);

  const panVerify = async () => {
    const res = await fetch(`${url}/api/users/user-pan-verification`, {
      method: "post",
      body: JSON.stringify({
        name: PANName,
        pan: PAN,
        userId: userId,
      }),
      headers: {
        "Content-Type": "applicaton/json",
      },
    });
    const result = await res.json();
    if (result.status === 200) {
      setRefresh(true);
      setKYCStatus("Done");
      setPANVerifyStatus(true);
      console.log(result.data);
    } else {
      alert("Something went wrong");
    }
  };

  const referAndEarn = (originalString) => {
    const secretKey = "imarszonechisecratekeyaahe"; // Keep this key secure

    // Encrypt the string
    const encryptedString = CryptoJS.AES.encrypt(
      originalString,
      secretKey
    ).toString();

    // Escape whitespaces and slashes using encodeURIComponent
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
  return (
    <div className="px-3 py-1">
      <div className="row">
        <div className="col-lg-10 m-auto">
          <div className="card ">
            <div className="card-header d-flex align-items-center py-lg-1 py-3 justify-content-between">
              <h3 className="mb-0">User Profile</h3>
              <button
                className="btn btn-primary mb-0"
                data-bs-toggle="modal"
                data-bs-target="#edirUsers"
              >
                <i className="fa fa-edit"></i>
              </button>
            </div>
            <div className="card-body p-3 table-responsive">
              <div className="row">
                <div className="col-lg-5 col-12">
                  <p>
                    <b>Reference By :</b> {userData.referBy}
                  </p>
                  <p>
                    <b>Name :</b> {userData.name}
                  </p>
                  <p>
                    <b>Email :</b> {userData.email}
                  </p>
                  <b>KYC Status :</b>{" "}
                  {userData.kycstatus === undefined ||
                  userData.kycstatus === "" ||
                  userData.kycstatus === null ? (
                    <>
                      <span className="text-danger">Pending</span>
                      <button
                        className="btn btn-primary mt-3  ms-auto"
                        data-bs-toggle="modal"
                        data-bs-target="#kycModal"
                      >
                        KYC Now
                      </button>
                    </>
                  ) : (
                    userData.kycstatus
                  )}
                </div>
                <div className="col-lg-5 col-12">
                  <p>
                    <b>Mobile :</b> {userData.mobile}
                  </p>
                  <p>
                    <b>Address :</b> {userData.address}
                  </p>
                  <p>
                    <b>PAN No. :</b>{" "}
                    {userData.pan === undefined ||
                    userData.pan === "" ||
                    userData.pan === null
                      ? ""
                      : userData.kycstatus}
                  </p>
                </div>
                <div className="col-lg-2 col-6 m-auto">
                  <Image
                    src={`${url}/uploads/${userData.profile_image}`}
                    alt=""
                    width={150}
                  />
                </div>

                <div className="col-lg-8 col-12 mt-4">
                  {userData.packageName === undefined ||
                  userData.packageName === "" ? (
                    ""
                  ) : (
                    <div className="row ">
                      <div className="col-lg-12">
                        <b>Refferal Link :</b>{" "}
                        <a
                          target="_blank"
                          className="refferalLink"
                          href={referLink}
                        >
                          {tempLink}
                        </a>
                      </div>
                      <div className="col-lg-4 col-12 text-start">
                        <h5 className="font-weight-bolder mb-0">
                          Refer and Earn :{" "}
                        </h5>
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
                  )}
                </div>
              </div>

              <div
                className="modal fade"
                id="edirUsers"
                tabindex="-1"
                aria-labelledby="edirUsersLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header py-2">
                      <h5 className="modal-title mb-0" id="edirUsersLabel">
                        Edit User Details
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            name="Name"
                            placeholder="Name"
                            defaultValue={userData.name && userData.name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            name="shopmobile"
                            placeholder="Shop Mobile"
                            defaultValue={userData.mobile && userData.mobile}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            name="shopemail"
                            placeholder="Shop Email"
                            defaultValue={userData.email && userData.email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row py-0">
                        <div className="col-lg-6 col-6">
                          <label>
                            Address<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            placeholder="Address"
                            defaultValue={userData.address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-4 col-8">
                          <label>Profile Image</label>
                          <input
                            type="file"
                            className="form-control"
                            name="Image"
                            placeholder="Image"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </div>
                        <div className="col-lg-2 col-4">
                          <Image
                            src={`${url}/upload/${
                              userData.image && userData.image
                            }`}
                            alt=""
                            width={"100%"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer py-1">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          uodateUserData();
                        }}
                        data-bs-dismiss="modal"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="modal fade"
                id="kycModal"
                tabindex="-1"
                aria-labelledby="kycModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="kycModalLabel">
                        KYC Form
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      {panVerifyStatus === false ? (
                        <div className="row">
                          <div className="col-lg-12 col-12">
                            <label>
                              PAN Number<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="PAN"
                              onChange={(e) => setPAN(e.target.value)}
                              required
                              placeholder="PAN"
                            />
                          </div>
                          <div className="col-lg-12 col-12">
                            <label>PAN Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="panName"
                              placeholder="PAN Name"
                              onChange={(e) => setPANName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-lg-12 col-12 text-center mt-3">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => panVerify()}
                              data-bs-dismiss="modal"
                            >
                              Verify
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
