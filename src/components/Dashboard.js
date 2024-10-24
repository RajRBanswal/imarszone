import React, { useEffect, useState } from "react";
import { url } from "../apiHelper/apiHelper";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [todaysUsers, setTodaysUsers] = useState([]);
  const getAllUsers = async () => {
    const response = await fetch(`${url}/api/admin/all-users`);
    const result = await response.json();
    if (result.status === 200) {
      setUsers(result.result);
    } else {
      setUsers(result.result);
    }
  };

  useEffect(() => {
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
  }, [url]);

  const [filterData, setFilterData] = useState([]);
  const getAdminWalletData = async () => {
    let all_rent_chages = await fetch(`${url}/api/admin/admin-wallet`);
    const allCharge = await all_rent_chages.json();
    if (allCharge.status === 200) {
      setFilterData(allCharge.result);
    } else {
      alert(allCharge.result);
    }
  };

  useEffect(() => {
    getAdminWalletData();
  }, [url]);

  const getTotal = () => {
    let total = 0;
    filterData.map((item) => {
      if (item.type === "Credit" && item.amountStatus === "Done") {
        total += parseInt(item.amount);
      } else if (item.type === "Debit" && item.amountStatus === "Done") {
        total -= parseInt(item.amount);
      }
    });
    return total;
  };

  return (
    <div>
      <div className="card-plain mb-0">
        <div className="card-body p-3">
          <div className="row">
            <div className="col-lg-6">
              <div className="d-flex flex-column h-100">
                <h2 className="font-weight-bolder mb-0">General Statistics</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row px-3">
        <div className="col-lg-4 col-sm-4">
          <Link className="card my-3" to="/admin/all-users">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person</i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-0 text-capitalize">All Users</h5>
                <h4 className="mb-0">{users.length}</h4>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-lg-4 col-sm-4">
          <Link className="card my-3" to="/admin/all-users">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person</i>
              </div>
              <div className="text-end pt-1">
                <h5 className=" mb-0 text-capitalize">Today's Users</h5>
                <h4 className="mb-0">{todaysUsers.length}</h4>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-lg-4 col-sm-4">
          <Link className="card my-3" to="/admin/admin-wallet">
            <div className="card-header p-3 pt-2 bg-transparent">
              <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">wallet</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">Admin Wallet</p>
                <h4 className="mb-0">{getTotal()}</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
