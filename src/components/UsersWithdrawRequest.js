import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { url } from "../apiHelper/apiHelper";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

const UsersWithdrawRequest = () => {
  const [addDialog, setAddDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const orderCmplt = useRef(null);
  const adminId = localStorage.getItem("adminId");
  const [filterData, setFilterData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [screenshote, setScreenshote] = useState("");

  const getAllRequest = async () => {
    const response = await fetch(`${url}/api/admin/all-withdraw-request`);
    const data = await response.json();

    if (data.status === 200) {
      setFilterData(data.result);
      let complete = [];
      let pending = [];
      data.result.map((item) => {
        if (item.status === "Done") {
          complete.push(item);
        } else if (item.status === "Pending") {
          pending.push(item);
        }
      });
      setCompletedData(complete);
      setPendingData(pending);
    } else {
      setFilterData([]);
      setPendingData([]);
      setCompletedData([]);
    }
  };

  useEffect(() => {
    getAllRequest();
  }, [adminId]);

  const openNew = (data) => {
    setSelectedData(data);
    setAddDialog(true);
  };

  const deletePoints = async (id) => {
    const response = await fetch(`${url}/api/admin/delete-point-prices`, {
      method: "post",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.status === 201) {
      alert(result.result);
    } else {
      alert(result.result);
    }
  };

  const filterApplyTemplate = (options) => {
    if (options.status === "Pending") {
      return (
        <>
          <Button
            label="Accept"
            className="me-1"
            severity="info"
            onClick={() => openNew(options)}
          />
          {/* <Button
            icon="pi pi-trash"
            className="ms-1"
            severity="danger"
            onClick={() => deletePoints(options._id)}
          /> */}
        </>
      );
    }
  };

  const headerComplete = (
    <div className="py-2">
      <div className="row">
        <div className="col-lg-6 d-flex">
          <h4 className="m-0">Complete Withdraw Request</h4>
        </div>
        <div className="col-lg-6">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
            />
          </IconField>
        </div>
      </div>
    </div>
  );
  const headerPending = (
    <div className="py-2">
      <div className="row">
        <div className="col-lg-6 d-flex">
          <h4 className="m-0">Pending Withdraw Request</h4>
        </div>
        <div className="col-lg-6">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
            />
          </IconField>
        </div>
      </div>
    </div>
  );
  const headerAll = (
    <div className="py-2">
      <div className="row">
        <div className="col-lg-6 d-flex">
          <h4 className="m-0">All Withdraw Request</h4>
        </div>
        <div className="col-lg-6">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
            />
          </IconField>
        </div>
      </div>
    </div>
  );
  const hideDialog = () => {
    setAddDialog(false);
  };

  const SaveData = async () => {
    const formData = new FormData();
    formData.append("id", selectedData._id);
    formData.append("userId", selectedData.userId);
    formData.append("amount", selectedData.amount);
    formData.append("walletAmount", selectedData.walletAmount);
    formData.append("reason", selectedData.reason);
    formData.append("transactionId", selectedData.transactionId);
    formData.append("accountNo", selectedData.paymode);
    formData.append("ifsc", selectedData.ifsc);
    formData.append("screenshote", screenshote);

    const response = await fetch(`${url}/api/admin/accept-withdraw-request`, {
      method: "post",
      body: formData,
    });
    const result = await response.json();
    if (result.status === 200) {
      hideDialog();
      alert(result.result);
      window.location.reload();
    } else {
      alert(result.result);
    }
  };

  const AddPriceDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="me-1"
        severity="danger"
        onClick={hideDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="ms-1"
        onClick={SaveData}
      />
    </React.Fragment>
  );

  return (
    <div className="requestTable">
      <Toast ref={toast} />

      <div className="card UserCardReports">
        <nav>
          <div className="nav nav-tabs mb-3 p-3" id="nav-tab" role="tablist">
            <button
              className="nav-link active w-25 py-2"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              All Withdraw Request
            </button>
            <button
              className="nav-link w-25 py-2"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Pending Withdraw Request
            </button>
            <button
              className="nav-link w-25 py-2"
              id="nav-contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-contact"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
            >
              Complete Withdraw Request
            </button>
          </div>
        </nav>
        <div className="tab-content p-3 border bg-light" id="nav-tabContent">
          <div
            className="tab-pane fade active show"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <DataTable
              ref={orderCmplt}
              value={filterData}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Requests"
              globalFilter={globalFilter}
              header={headerAll}
            >
              <Column
                field="#"
                header="#"
                bodyStyle={{
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                body={(data, options) => options.rowIndex + 1}
              ></Column>
              <Column field="userName" header="Name" sortable></Column>
              <Column
                field="amount"
                header="Amt"
                bodyStyle={{ fontWeight: "bold", textAlign: "center" }}
                sortable
              ></Column>
              <Column
                field="paymode"
                header="Acc/UPI"
                bodyStyle={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "red",
                }}
                sortable
              ></Column>
              <Column field="ifsc" header="IFSC" sortable></Column>
              <Column field="transactionId" header="TxnId" sortable></Column>
              <Column field="transactionDate" header="Date" sortable></Column>
              <Column
                field="status"
                header="Status"
                sortable
                bodyStyle={{ color: "green" }}
              ></Column>
              <Column
                header="Action"
                style={{ minWidth: "4rem" }}
                body={filterApplyTemplate}
                severity="success"
              ></Column>
            </DataTable>
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <DataTable
              ref={orderCmplt}
              value={pendingData}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Requests"
              globalFilter={globalFilter}
              header={headerPending}
            >
              <Column
                field="#"
                header="Sr. No."
                bodyStyle={{
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                body={(data, options) => options.rowIndex + 1}
              ></Column>
              <Column
                field="userName"
                header="Name"
                bodyStyle={{ fontWeight: "bold", textAlign: "center" }}
                headerStyle={{ textAlign: "center" }}
                sortable
              ></Column>
              <Column
                field="amount"
                header="Amt"
                bodyStyle={{ fontWeight: "bold", textAlign: "center" }}
                sortable
              ></Column>
              <Column
                field="transactionId"
                header="TxnId"
                bodyStyle={{ fontWeight: "bold", textAlign: "center" }}
                sortable
              ></Column>
              <Column
                field="transactionDate"
                header="Date"
                bodyStyle={{ fontWeight: "bold" }}
                sortable
              ></Column>
              <Column
                field="status"
                header="Status"
                sortable
                bodyStyle={{ color: "green" }}
              ></Column>
              <Column
                header="Action"
                style={{ minWidth: "4rem" }}
                body={filterApplyTemplate}
                severity="success"
              ></Column>
            </DataTable>
          </div>
          <div
            className="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            <DataTable
              ref={orderCmplt}
              value={completedData}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Requests"
              globalFilter={globalFilter}
              header={headerComplete}
            >
              <Column
                field="#"
                header="Sr. No."
                bodyStyle={{
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                body={(data, options) => options.rowIndex + 1}
              ></Column>
              <Column
                field="userName"
                header="Name"
                bodyStyle={{ fontWeight: "bold", textAlign: "center" }}
                headerStyle={{ textAlign: "center" }}
                sortable
              ></Column>
              <Column
                field="amount"
                header="Amt"
                bodyStyle={{ fontWeight: "bold", textAlign: "center" }}
                sortable
              ></Column>
              <Column
                field="paymode"
                header="Acc/UPI"
                bodyStyle={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "red",
                }}
                sortable
              ></Column>
              <Column field="ifsc" header="IFSC" sortable></Column>
              <Column field="transactionId" header="TxnId" sortable></Column>
              <Column field="transactionDate" header="Date" sortable></Column>
              <Column
                field="status"
                header="Status"
                sortable
                bodyStyle={{ color: "green" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
      <Dialog
        visible={addDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={"Accept Request"}
        modal
        className="p-fluid"
        footer={AddPriceDialogFooter}
        onHide={hideDialog}
      >
        <div className="px-3 py-5">
          <div className="row ">
            <div className="col-lg-12 text-center">
              <h5 className="fw-bold text-warning">
                Are You Sure! Accept the Request
              </h5>
            </div>
            <hr className=" mt-3" />
            <div className="col-lg-12 mt-3">
              <h5>Account No. {selectedData.paymode}</h5>
            </div>
            <div className="col-lg-12 mt-1">
              <label>
                Add Screenshot <small className="text-danger">*</small>
              </label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setScreenshote(e.target.files[0])}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UsersWithdrawRequest;
