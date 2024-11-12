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
import Select from "react-select";
const State = require("../apiHelper/state_dist_taluka.json");

const UserProfile = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [referLink, setReferLink] = useState("");
  const [tempLink, setTempLink] = useState("");
  const [PANs, setPAN] = useState("");
  const [bankName, setbankName] = useState("");
  const [branchName, setbranchName] = useState("");
  const [accNo, setaccNo] = useState("");
  const [ifscCode, setifscCode] = useState("");
  const [accHolderName, setaccHolderName] = useState("");
  const [taluka, setTaluka] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

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

  const [allDistricts, setAllDistricts] = useState([]);
  // Extract unique states
  const uniqueStates = [...new Set(State.map((item) => item.State))];

  // Map for your desired structure
  const stateData = uniqueStates.map((state) => ({
    value: state,
    label: state,
  }));

  const GetState = (row) => {
    setState(row.value);

    // Get unique districts for the selected state
    const uniqueDistrict = [
      ...new Set(
        State.map((item) => {
          if (item.State === row.value) {
            return item.District;
          }
          return null; // Return null for unmatched items
        }).filter(Boolean) // Filter out null values
      ),
    ];

    // Format districts for use in cityData
    const formattedDistricts = uniqueDistrict.map((district) => ({
      value: district,
      label: district,
    }));

    setAllDistricts(formattedDistricts); // Uncomment to set the formatted districts
  };

  const [talukaList, setTalukaList] = useState([]); // State for search input
  const getCity = (row) => {
    setCity(row.value);
    const allTaluka = [];

    State.forEach((item) => {
      if (item.District === row.value && item.State === state) {
        allTaluka.push({
          value: item.Taluka,
          label: item.Taluka,
        });
      }
    });
    setTalukaList(allTaluka);
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
    formData.append("taluka", taluka ? taluka : "");
    formData.append("city", city ? city : "");
    formData.append("state", state ? state : "");
    formData.append("pincode", pincode ? pincode : "");
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

  const updateBankDetails = async () => {
    if (
      !PANs ||
      !bankName ||
      !branchName ||
      !accNo ||
      !ifscCode ||
      !accHolderName
    ) {
      alert("Fill All fields");
    } else {
      const res = await fetch(`${url}/api/users/update-bank-details`, {
        method: "post",
        body: JSON.stringify({
          PANs: PANs,
          bankName: bankName,
          branchName: branchName,
          accNo: accNo,
          ifscCode: ifscCode,
          accHolderName: accHolderName,
          userId: userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (result.status === 201) {
        setRefresh(true);
        alert(result.result);
      } else {
        alert("Something went wrong");
      }
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

    setPAN(userData.pan);
    setbankName(userData.bankName);
    setbranchName(userData.branchName);
    setaccNo(userData.accNo);
    setifscCode(userData.ifscCode);
    setaccHolderName(userData.accHolderName);
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
                <i className="fa fa-edit"></i> Edit Profile
              </button>
            </div>
            <div className="card-body p-3 table-responsive">
              <div className="row">
                <div className="col-lg-5 col-12">
                  <p className="text-success fw-bold">
                    <b className="text-dark">Sponsor Id :</b>{" "}
                    {userData.sponsorId}
                  </p>
                  <p>
                    <b>Name :</b> {userData.name}
                  </p>
                  <p className="text-success fw-bold">
                    <b className="text-dark">Login Id :</b> {userData._id}
                  </p>
                </div>
                <div className="col-lg-5 col-12">
                  <p className="text-success fw-bold">
                    <b className="text-dark">Sponsor Name :</b>{" "}
                    {userData.referBy}
                  </p>
                  <p>
                    <b>Mobile :</b> {userData.mobile}
                  </p>
                  <p>
                    <b>Email :</b> {userData.email}
                  </p>
                </div>
                <div className="col-lg-2 col-6 m-auto">
                  <Image
                    src={`${url}/uploads/${userData.profile_image}`}
                    alt=""
                    width={"100%"}
                  />
                </div>
                <div className="col-lg-12 col-12">
                  <p className="">
                    <b>
                      Address <small>(Full Address for Dispatch)</small> :
                    </b>{" "}
                    {!userData.state || !userData.taluka || !userData.city ? (
                      <p>{userData.address}</p>
                    ) : (
                      <p>
                        {userData.address}, {userData.taluka}, {userData.city},{" "}
                        {userData.state}. {userData.pincode}
                      </p>
                    )}
                  </p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-12 col-12">
                  <h3>Bank Details</h3>
                </div>
                <div className="col-lg-4 col-12">
                  <label>PAN No.</label>
                  <input
                    type="text"
                    value={userData.pan}
                    className="form-control"
                    placeholder="PAN NO."
                    onChange={(e) => setPAN(e.target.value)}
                  />
                </div>
                <div className="col-lg-4 col-12">
                  <label>Bank Name</label>
                  <input
                    type="text"
                    value={userData.bankName}
                    className="form-control"
                    placeholder="Bank Name"
                    onChange={(e) => setbankName(e.target.value)}
                  />
                </div>
                <div className="col-lg-4 col-12">
                  <label>Branch Name</label>
                  <input
                    type="text"
                    value={userData.branchName}
                    className="form-control"
                    placeholder="Branch Name"
                    onChange={(e) => setbranchName(e.target.value)}
                  />
                </div>
                <div className="col-lg-4 col-12">
                  <label>Account No.</label>
                  <input
                    type="text"
                    value={userData.accNo}
                    className="form-control"
                    placeholder="Account Number"
                    onChange={(e) => setaccNo(e.target.value)}
                  />
                </div>
                <div className="col-lg-4 col-12">
                  <label>IFSC Code</label>
                  <input
                    type="text"
                    value={userData.ifscCode}
                    className="form-control"
                    placeholder="IFSC Code"
                    onChange={(e) => setifscCode(e.target.value)}
                  />
                </div>
                <div className="col-lg-4 col-12">
                  <label>Acc Holder Name</label>
                  <input
                    type="text"
                    value={userData.accHolderName}
                    className="form-control"
                    placeholder="Acc Holder Name"
                    onChange={(e) => setaccHolderName(e.target.value)}
                  />
                </div>
                <div className="col-lg-12 col-12 text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => updateBankDetails()}
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-8 col-12 mt-4">
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
                          <label>Full Name</label>
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
                          <label>Mobile Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="shopmobile"
                            placeholder="Mobile No."
                            defaultValue={userData.mobile && userData.mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-6">
                          <label>Email</label>
                          <input
                            type="text"
                            className="form-control"
                            name="shopemail"
                            placeholder="Email"
                            defaultValue={userData.email && userData.email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label>Profile Image</label>
                          <input
                            type="file"
                            className="form-control"
                            name="Image"
                            placeholder="Image"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col-lg-4 col-12 col-md-4">
                          <label className="form-label">State</label>
                          <Select
                            defaultValue={userData.state}
                            onChange={GetState}
                            options={stateData}
                          />
                        </div>
                        <div className="col-lg-4 col-12 col-md-4">
                          <label className="form-label">District</label>
                          <Select
                            defaultValue={userData.city}
                            onChange={getCity}
                            options={allDistricts}
                          />
                        </div>
                        <div className="col-lg-4 col-12 col-md-4">
                          <label className="form-label">Taluka</label>
                          <Select
                            defaultValue={userData.taluka}
                            onChange={(value) => setTaluka(value.value)}
                            options={talukaList}
                          />
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col-lg-4 col-12 col-md-4">
                          <label className="form-label">Village/Town</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Address"
                            defaultValue={userData.address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-4 col-12 col-md-4">
                          <label className="form-label">
                            Pincode<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Pincode"
                            defaultValue={userData.pincode}
                            onChange={(e) => setPincode(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* <div className="row py-0">
                        <div className="col-lg-12 col-12">
                          <label>
                            Address<span className="text-danger">*</span>
                            <small>
                              (Full Address with Pincode for Dispatch)
                            </small>
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
                        <div className="col-lg-2 col-4">
                          <Image
                            src={`${url}/upload/${
                              userData.image && userData.image
                            }`}
                            alt=""
                            width={"100%"}
                          />
                        </div>
                      </div> */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
