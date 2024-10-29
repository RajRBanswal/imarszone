import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { url } from "../apiHelper/apiHelper";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const PetrolCardWallet = () => {
  let userId = "";
  const navigate = useNavigate();
  userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const [walletData, setWalletData] = useState([]);
  const [showTransaction, setShowTransaction] = useState(false);

  const getWalletData = async () => {
    const response = await fetch(`${url}/api/users/user-petrol-card-wallet`, {
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

  useEffect(() => {
    getWalletData();
  }, [userId]);

  return (
    <div className="">
      <div className="iphone">
        <div className="header">
          <div className="header-summary w-50 ps-lg-5 ps-2">
            <div className="summary-text mb-0">Petrol Card Balance</div>
            <div className="summary-balance">
              <i className="fa fa-rupee"></i> {getTotal()}.00
            </div>
          </div>
          <div className="user-profile w-50 text-center pe-lg-5 pe-0">
            <h2 className="text-white z-index-3">{userName}</h2>
          </div>
        </div>
        <div className="content">
          <div className="card">
            <div className="upper-row">
              <div className="card-item">
                <span>My Saving</span>
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
                      <th scope="col">User Id</th>
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
                        <td className="fw-bold">{item.userId}</td>
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
    </div>
  );
};
export default PetrolCardWallet;
