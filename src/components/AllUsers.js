import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { url } from "../apiHelper/apiHelper";
import Select from "react-select";
const State = require("../apiHelper/state_dist_taluka.json");

const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const [usersDialog, setUsersDialog] = useState(false);
  const [issueCardDialog, setIssueCardDialog] = useState(false);
  const [editUserDialog, setEditUserDialog] = useState(false);
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);

  const [user, setUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [taluka, setTaluka] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [password, setPassword] = useState("");

  const toast = useRef(null);
  const dt = useRef(null);
  const mobileRef = useRef(null);

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
  }, [url]);

  const openDialog = (rowData) => {
    setUser(rowData);
    setUsersDialog(true);
  };

  const openEditDialog = (rowData) => {
    setUser(rowData);
    setEditUserDialog(true);
  };

  const hideDialog = () => {
    setUser([]);
    setUsersDialog(false);
    setEditUserDialog(false);
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${url}/uploads/${rowData.profile_image}`}
        alt={rowData.profile_image}
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    if (rowData.kycstatus === "Done") {
      return <strong className="text-success">Active</strong>;
    } else {
      return <strong className="text-danger">Inactive</strong>;
    }
    // let abc = (
    //   <>
    //     <p>Card Number</p>
    //     <p>{rowData.cardNumber}</p>
    //   </>
    // );
  };

  // const deleteUser = (rowData) => {};

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          className="mr-2"
          onClick={() => openDialog(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          className="mr-2"
          severity="info"
          onClick={() => openEditDialog(rowData)}
        />
        {/* <Button
          icon="pi pi-trash"
          severity="danger"
          onClick={() => deleteUser(rowData)}
        /> */}
      </React.Fragment>
    );
  };

  const getSeverity = (user) => {
    switch (user.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const getMobile = (mobileN) => {
    if (mobileN.length > 9 && mobileN.length < 11) {
      setMobile(mobileN);
    } else {
      mobileRef.current.focus();
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between py-1">
      <h4 className="m-0">Manage Users</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
    </div>
  );

  const hideIssueDialog = () => {
    setIssueCardDialog(false);
  };
  const updateCardDetails = async () => {
    const response = await fetch(`${url}/api/admin/add-card-details`, {
      method: "post",
      body: JSON.stringify({
        id: user._id,
        cardNumber: cardNumber,
        issueDate: issueDate,
        expiryDate: expiryDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.status === 200) {
      setIssueCardDialog(false);
      setCardNumber("");
      setIssueDate("");
      alert(result.result);
    } else {
      alert(result.result);
    }
  };
  const issueCardFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="me-1"
        severity="danger"
        onClick={() => setIssueCardDialog(true)}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="ms-1"
        onClick={() => updateCardDetails()}
      />
    </React.Fragment>
  );
  const editUserDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="me-1"
        severity="danger"
        onClick={() => setEditUserDialog(false)}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="ms-1"
        onClick={() => storeUser()}
      />
    </React.Fragment>
  );

  const changePasswordNow = async () => {
    const response = await fetch(`${url}/api/users/change-password`, {
      method: "post",
      body: JSON.stringify({ userId: user._id, newPassword: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === 201) {
      alert(`${password} Password Changed Successfully`);
      window.location.reload();
    } else {
      alert(`Password not changed`);
    }
  };

  const changePasswordDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="me-1"
        severity="danger"
        onClick={() => setChangePasswordDialog(false)}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="ms-1"
        onClick={() => changePasswordNow()}
      />
    </React.Fragment>
  );

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

  const storeUser = async () => {
    const response = await fetch(`${url}/api/admin/user-update`, {
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
        name: name,
        mobile: mobile,
        email: email,
        address: address,
        taluka: taluka,
        city: city,
        state: state,
        pincode: pincode,
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
  };
  const getAddress = (rowData) => {
    if (!rowData.state || !rowData.taluka || !rowData.city) {
      return <p>{rowData.address}</p>;
    } else {
      return (
        <p>
          {rowData.address}, {rowData.taluka}, {rowData.city}, {rowData.state}.{" "}
          {rowData.pincode}
        </p>
      );
    }
  };
  const hideCPDialog = () => {
    setChangePasswordDialog(false);
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          ref={dt}
          value={users}
          selection={selectedUsers}
          onSelectionChange={(e) => setSelectedUsers(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            field="_id"
            header="#"
            body={(rowData, options) => options.rowIndex + 1}
            sortable
          ></Column>
          <Column field="_id" header="User Id" sortable></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="mobile" header="Mobile No." sortable></Column>
          <Column
            field="address"
            header="Address"
            body={getAddress}
            sortable
          ></Column>
          <Column
            field="profile_image"
            header="Image"
            body={imageBodyTemplate}
          ></Column>
          {/* <Column
            field="cardStatus"
            header="Card Status"
            body={statusBodyTemplate}
            sortable
          ></Column> */}
          <Column
            field="kycstatus"
            header="Status"
            body={statusBodyTemplate}
            sortable
          ></Column>
          <Column
            body={actionBodyTemplate}
            header="Action"
            exportable={false}
            style={{ minWidth: "2rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={usersDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="User Details"
        modal
        className="p-fluid"
        // footer={{}}
        onHide={hideDialog}
      >
        <table className="table table-bordered">
          <tr>
            <th>Name :</th>
            <td>{user.name}</td>
            <th>Mobile No :</th>
            <td>{user.mobile}</td>
          </tr>
          <tr>
            <th>Email :</th>
            <td colSpan={3}>{user.email}</td>
          </tr>
          <tr>
            <th>Address :</th>
            <td colSpan={3}>{user.address}</td>
          </tr>
          <tr>
            <th>Card Status :</th>
            <td colSpan={3} className="py-1">
              {user.cardStatus == undefined || user.cardStatus === "Pending" ? (
                <button
                  className="btn btn-outline-success mr-2"
                  onClick={() => {
                    setUsersDialog(false);
                    setIssueCardDialog(true);
                  }}
                >
                  <i className="fa fa-check"></i> Issue a Card
                </button>
              ) : (
                <span>{user.cardStatus}</span>
              )}
            </td>
          </tr>
          {user.cardStatus === "Done" ? (
            <tr>
              <th>Card No.</th>
              <td>{user.cardNumber}</td>
              <th>
                Approved : <br /> Expiry Date :
              </th>
              <td>
                {user.cardApprovedDate} <br /> {user.cardExpiryDate}
              </td>
            </tr>
          ) : (
            ""
          )}
          <tr>
            <th className="text-success">Change Password :</th>
            <td colSpan={3} className="py-1">
              <button
                className="btn btn-outline-primary mr-2"
                onClick={() => {
                  setUsersDialog(false);
                  setChangePasswordDialog(true);
                }}
              >
                <i className="fa fa-check"></i>Change Password Now
              </button>
            </td>
          </tr>
        </table>
      </Dialog>

      <Dialog
        visible={changePasswordDialog}
        style={{ width: "30rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Change Password"
        modal
        className="p-fluid"
        footer={changePasswordDialogFooter}
        onHide={hideCPDialog}
      >
        <div className="row">
          <div className="col-lg-12 mt-3">
            <input
              type="text"
              className="form-control"
              name="Name"
              value={user.name}
              readOnly
            />
          </div>
          <div className="col-lg-12 mt-3">
            <label>Enter New Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={issueCardDialog}
        style={{ width: "30rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Card Details"
        modal
        className="p-fluid"
        footer={issueCardFooter}
        onHide={hideIssueDialog}
      >
        <div className="row">
          <div className="col-lg-12 mt-3">
            <input
              type="text"
              className="form-control"
              name="Name"
              value={user.name}
              readOnly
            />
          </div>
          <div className="col-lg-12 mt-3">
            <label>Card Number</label>
            <input
              type="text"
              className="form-control"
              name="card"
              placeholder="Card Number"
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="col-lg-12 mt-3">
            <label>Card Approved Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              placeholder="Card Approved Date"
              onChange={(e) => setIssueDate(e.target.value)}
            />
          </div>
          <div className="col-lg-12 mt-3">
            <label>Card Expiry Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              placeholder="Card Expiry Date"
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={editUserDialog}
        style={{ width: "80%" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit User Details"
        modal
        className="p-fluid"
        footer={editUserDialogFooter}
        onHide={hideDialog}
      >
        <div className="row">
          <div className="row">
            <div className="col-lg-4 col-12 col-md-4">
              <h4>User ID : {user._id}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-12 col-md-4">
              <label className="form-label">
                Name <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                defaultValue={user.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-lg-4 col-12 col-md-4">
              <label className="form-label">
                Mobile No. <span className="text-danger fw-bold">*</span>
              </label>
              <input
                ref={mobileRef}
                type="number"
                className="form-control"
                placeholder="Enter Mobile No."
                defaultValue={user.mobile}
                onChange={(e) => getMobile(e.target.value)}
              />
            </div>
            <div className="col-lg-4 col-12 col-md-4">
              <label className="form-label">
                Email {""}
                <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-lg-4 col-12 col-md-4">
              <label className="form-label">State</label>
              <Select
                defaultValue={user.state}
                onChange={GetState}
                options={stateData}
              />
            </div>
            <div className="col-lg-4 col-12 col-md-4">
              <label className="form-label">District</label>
              <Select
                defaultValue={user.city}
                onChange={getCity}
                options={allDistricts}
              />
            </div>
            <div className="col-lg-4 col-12 col-md-4">
              <label className="form-label">Taluka</label>
              <Select
                defaultValue={user.taluka}
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
                defaultValue={user.address}
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
                defaultValue={user.pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AllUsers;
