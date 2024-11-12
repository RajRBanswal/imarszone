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

const PetrolCardDetails = () => {
  const [users, setUsers] = useState(null);
  const [usersDialog, setUsersDialog] = useState(false);
  const [issueCardDialog, setIssueCardDialog] = useState(false);
  const [user, setUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const toast = useRef(null);
  const dt = useRef(null);

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

  const hideDialog = () => {
    setUsersDialog(false);
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

  const getWalletData = async (userId) => {
    try {
      const response = await fetch(`${url}/api/users/user-petrol-card-wallet`, {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // Check the data structure and log for debugging
      if (data.status === 200 && Array.isArray(data.result)) {
        let total = 0;
        console.log("Data result:", data.result);

        data.result.forEach((item) => {
          if (item.type === "Credit" && item.amountStatus === "Done") {
            total += parseInt(item.amount);
          } else if (item.type === "Debit" && item.amountStatus === "Done") {
            total -= parseInt(item.amount);
          }
        });
        return total;
      } else {
        console.error("Unexpected response structure", data);
        return 0;
      }
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      return 0;
    }
  };

  const WalletComponent = ({ rowData }) => {
    const [amount, setAmount] = useState(null);

    useEffect(() => {
      // Fetch the wallet data when the component mounts or rowData changes
      const fetchWalletData = async () => {
        try {
          const amount = await getWalletData(rowData._id);
          setAmount(amount);
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        }
      };

      fetchWalletData();
    }, [rowData._id]);

    return (
      <div>
        {amount > 0 ? (
          <strong className="text-success">{amount}</strong>
        ) : (
          <span className="text-dark">0</span>
        )}
      </div>
    );
  };

  // Usage example with your table component
  const statusBodyTemplate = (rowData) => {
    return <WalletComponent rowData={rowData} />;
  };

  const deleteUser = (rowData) => {};

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <Button
          icon="pi pi-eye"
          className="mr-2"
          onClick={() => openDialog(rowData)}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          onClick={() => deleteUser(rowData)}
        /> */}
      </React.Fragment>
    );
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
          <Column field="_id" header="Id" sortable></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column
            field="profile_image"
            header="Image"
            body={imageBodyTemplate}
          ></Column>
          <Column
            field="cardStatus"
            header="Petrol Card Wallet"
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

      {/* <Dialog
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
                    className="btn btn-primary mr-2"
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
          </table>
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
        </Dialog> */}
    </>
  );
};

export default PetrolCardDetails;
