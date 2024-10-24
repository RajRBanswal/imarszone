import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { url } from "../apiHelper/apiHelper";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const UserWallet = () => {
  let userId = "";
  const navigate = useNavigate();
  userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const [walletData, setWalletData] = useState([]);
  const [withdrawRequestDialog, setWithdrawRequestDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [reason, setReason] = useState("");
  const [lastRequest, setLastRequest] = useState(false);
  const [allWithdrawRequestDialog, setAllWithdrawRequestDialog] =
    useState(false);
  const [allWithdrawRequest, setAllWithdrawRequest] = useState([]);
  const [topUpDialog, setTopUpDialog] = useState(false);
  const [screenshot, setScreenshot] = useState("");
  const [amount, setAmount] = useState("");
  const [showTransaction, setShowTransaction] = useState(false);
  const [allTopupRequestDialog, setAllTopupRequestDialog] = useState(false);
  const [allTopupRequest, setAllTopupRequest] = useState([]);
  const [AccNo_UPI, setAccNo_UPI] = useState("");
  const [IfscCode, getIfscCode] = useState("");

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
      if (item.type === "Credit") {
        total += parseInt(item.amount);
      } else if (item.type === "Debit") {
        total -= parseInt(item.amount);
      }
    });
    return total;
  };
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getAllRequest = async () => {
    const response = await fetch(`${url}/api/users/users-withdraw-request`, {
      method: "post",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.status === 200) {
      setAllWithdrawRequest(data.result);
      let last = data.result[data.result.length - 1];
      if (last && last.status === "Pending") {
        setLastRequest(true);
      } else {
        setLastRequest(false);
      }
    } else {
      setAllWithdrawRequest([]);
      setLastRequest(false);
    }
  };

  const getAllTopupRequest = async () => {
    const response = await fetch(`${url}/api/users/users-topup-request`, {
      method: "post",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      setAllTopupRequest(data.result);
    } else {
      setAllTopupRequest([]);
    }
  };

  useEffect(() => {
    getWalletData();
    getAllRequest();
    getAllTopupRequest();
  }, [userId]);

  const openDialog = () => {
    setWithdrawRequestDialog(true);
  };

  const openRequestDialog = () => {
    setAllWithdrawRequestDialog(true);
  };

  const openTopupRequestDialog = () => {
    setAllTopupRequestDialog(true);
  };

  const hideDialog = () => {
    setWithdrawRequestDialog(false);
    setAllWithdrawRequestDialog(false);
    setTopUpDialog(false);
    setAllTopupRequestDialog(false);
  };

  const getWithdrawRequest = async (value) => {
    if (getTotal() >= value) {
      setWithdrawAmount(value);
    } else {
      alert("Enter amount lessthan wallet total");
      ref.current.focus();
    }
  };

  const sendWithdrawRequest = async () => {
    if ((!withdrawAmount && getTotal() >= withdrawAmount) || !AccNo_UPI) {
      alert("Enter amount lessthan wallet total or enter account no. UPI Id ");
      ref.current.focus();
    } else {
      const response = await fetch(`${url}/api/users/withdraw-request`, {
        method: "POST",
        body: JSON.stringify({
          userId,
          walletAmount: getTotal(),
          withdrawAmount: withdrawAmount,
          reason,
          AccNo_UPI,
          IfscCode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
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

  const withdrawRequestDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        className="mr-2"
        severity="danger"
        onClick={() => hideDialog()}
      />
      <Button
        label="Submit"
        icon="pi pi-check"
        className="mr-2"
        onClick={() => sendWithdrawRequest()}
      />
    </React.Fragment>
  );
  const allWithdrawRequestDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        className="mr-2"
        severity="danger"
        onClick={() => hideDialog()}
      />
    </React.Fragment>
  );
  const allTopupRequestDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        className="mr-2"
        severity="danger"
        onClick={() => hideDialog()}
      />
    </React.Fragment>
  );

  const topUpAmount = async () => {
    if (!amount || !screenshot) {
      alert("Enter Amount and upload Payment success Screenshot");
      ref.current.focus();
    } else {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("amount", amount);
      formData.append("walletAmount", getTotal());
      formData.append("screenshot", screenshot);

      const response = await fetch(`${url}/api/users/topup-amount`, {
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

  const topUpDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        className="mr-2"
        severity="danger"
        onClick={() => hideDialog()}
      />
      <Button
        label="Submit"
        icon="pi pi-check"
        className="mr-2"
        onClick={() => topUpAmount()}
      />
    </React.Fragment>
  );

  return (
    <div className="">
      <div className="iphone">
        <div className="header">
          <div className="header-summary w-50 ps-5">
            <div className="summary-text mb-0">My Balance</div>
            <div className="summary-balance">
              <i className="fa fa-rupee"></i> {getTotal()}.00
            </div>
          </div>
          <div className="user-profile w-50 text-center pe-5">
            <h2 className="text-white">{userName}</h2>
          </div>
        </div>
        <div className="content">
          <div className="card">
            <div className="upper-row">
              <div className="card-item">
                <span>Active Balance</span>
                <span>
                  <i className="fa fa-rupee"></i> {getTotal()}
                </span>
              </div>
              <div className="card-item">
                <span>My Save it</span>
                <span>
                  <i className="fa fa-rupee"></i> {getTotal()}
                </span>
              </div>
              <div className="card-item">
                <span>View Transaction</span>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleClick();
                    setShowTransaction(true);
                  }}
                >
                  <i className="fa fa-eye"></i>
                </button>
              </div>
            </div>
            <div className="lower-row">
              <button
                className="icon-item btn btn-outline-warning"
                onClick={() => setTopUpDialog(true)}
              >
                <div className="icon">
                  <i className="fas fa-upload"></i>
                </div>
                <div className="icon-text">Top-up</div>
              </button>
              <button
                className="icon-item btn btn-outline-danger"
                onClick={() => openTopupRequestDialog()}
              >
                <div className="icon">
                  <i className="fas fa-list"></i>
                </div>
                <div className="icon-text">All TopUp Request</div>
              </button>
              <button
                className="icon-item btn btn-outline-danger"
                onClick={() => openDialog()}
                disabled={
                  getTotal() > 100 && lastRequest !== true ? false : true
                }
              >
                <div className="icon">
                  <i className="fas fa-money-check-alt"></i>
                </div>
                <div className="icon-text">Withdraw Request</div>
              </button>
              <button
                className="icon-item btn btn-outline-danger"
                onClick={() => openRequestDialog()}
              >
                <div className="icon">
                  <i className="fas fa-list"></i>
                </div>
                <div className="icon-text">All Withdraw Request</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={"row mt-5 " + (showTransaction ? "d-block" : "d-none")}
        ref={ref}
      >
        <div className="col-lg-12 m-auto">
          <div className="card ">
            <div className="card-header py-2">
              <h3 className="card-title d-flex mb-0 justify-content-between">
                History{" "}
                <i
                  className="fa fa-close"
                  onClick={() => {
                    setShowTransaction(false);
                  }}
                ></i>
              </h3>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Txn Id</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Type</th>
                      <th scope="col">Reason</th>
                      <th scope="col">Status</th>
                      <th scope="col" className="text-end">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletData.map((item, index) => (
                      <tr key={index}>
                        <td scope="row">{index + 1}</td>
                        <td>{item.transactionId}</td>
                        <td>{item.transactionDate}</td>
                        <td>{item.transactionTime}</td>
                        <td>{item.type}</td>
                        <td>{item.reason === undefined ? "" : item.reason}</td>
                        <td>{item.status}</td>
                        <td className="text-success text-end">
                          {item.type === "Debit" ? (
                            <p className="text-danger mb-0">
                              - <i className="fa fa-rupee"></i> {item.amount}
                            </p>
                          ) : (
                            <p className="text-success mb-0">
                              {" "}
                              + <i className="fa fa-rupee"></i> {item.amount}
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        visible={withdrawRequestDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Withdraw Request"
        modal
        className="p-fluid"
        footer={withdrawRequestDialogFooter}
        onHide={hideDialog}
      >
        <div className="row pb-3">
          <div className="col-lg-12">
            <label>Wallet Amount</label>
            <input
              type="text"
              className="form-control"
              value={getTotal()}
              readOnly
            />
          </div>
          <div className="col-lg-6 mt-3">
            <label>
              Account No. / UPI ID <span className="text-danger">*</span>
            </label>
            <input
              ref={ref}
              type="text"
              className="form-control"
              placeholder="Account No. / UPI ID"
              onChange={(e) => setAccNo_UPI(e.target.value)}
            />
          </div>
          <div className="col-lg-6 mt-3">
            <label>IFSC Code</label>
            <input
              ref={ref}
              type="text"
              className="form-control"
              placeholder="IFSC Code"
              onChange={(e) => getIfscCode(e.target.value)}
            />
          </div>
          <div className="col-lg-12 mt-3">
            <label>Withdraw Amount</label>
            <input
              ref={ref}
              type="text"
              className="form-control"
              placeholder="Enter Withdraw Amount"
              onChange={(e) => getWithdrawRequest(e.target.value)}
            />
          </div>
          <div className="col-lg-12 mt-3">
            <label>Reason</label>
            <input
              type="text"
              className="form-control"
              placeholder="Reason"
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={allWithdrawRequestDialog}
        style={{ width: "45rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="All Withdraw Request"
        modal
        className="p-fluid"
        footer={allWithdrawRequestDialogFooter}
        onHide={hideDialog}
      >
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Request Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Acc/UPI</th>
                <th scope="col">Reason</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {allWithdrawRequest.map((item, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{item.transactionDate}</td>
                  <td>{item.amount}</td>
                  <td>{item.paymode}</td>
                  <td>{item.reason === undefined ? "" : item.reason}</td>
                  <td>
                    {" "}
                    {item.status === "" || item.status === "Done" ? (
                      <b className="text-success">{item.status}</b>
                    ) : (
                      <b className="text-warning">{item.status}</b>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>

      <Dialog
        visible={topUpDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Topup Request"
        modal
        className="p-fluid"
        footer={topUpDialogFooter}
        onHide={hideDialog}
      >
        <div className="row pb-3">
          <div className="col-lg-12">
            <label>Wallet Amount</label>
            <input
              type="text"
              className="form-control"
              value={getTotal()}
              readOnly
            />
          </div>
          <div className="col-lg-12 mt-3">
            <label>
              Amount (<small className="text-danger">*</small>)
            </label>
            <input
              ref={ref}
              type="text"
              className="form-control"
              placeholder="Enter Withdraw Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col-lg-12 mt-3">
            <label>
              Payment Success Screenshot (
              <small className="text-danger">*</small>)
            </label>
            <input
              ref={ref}
              type="file"
              className="form-control"
              placeholder="Screenshot"
              onChange={(e) => setScreenshot(e.target.files[0])}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={allTopupRequestDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="All Topup Request"
        modal
        className="p-fluid"
        footer={allTopupRequestDialogFooter}
        onHide={hideDialog}
      >
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Request Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Screenshot</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {allTopupRequest.map((item, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{item.transactionDate}</td>
                  <td>{item.amount}</td>
                  <td>
                    <Link
                      to={`${url}/uploads/${item.screenshot}`}
                      target="_blank"
                    >
                      <img
                        src={`${url}/uploads/${item.screenshot}`}
                        width={100}
                      />
                    </Link>
                  </td>
                  <td>
                    {" "}
                    {item.status === "" || item.status === "Done" ? (
                      <b className="text-success">{item.status}</b>
                    ) : (
                      <b className="text-warning">{item.status}</b>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>
    </div>
  );
};

export default UserWallet;
