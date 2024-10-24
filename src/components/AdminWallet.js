import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import moment from "moment";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { url } from "../apiHelper/apiHelper";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
const AdminWallet = () => {
  const [price, setPrice] = useState(0);
  const [loadPage, setLoadPage] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [successData, setSuccessData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const orderCmplt = useRef(null);
  const adminId = localStorage.getItem("admin_id");
  const [filterData, setFilterData] = useState([]);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAdminWalletData = async () => {
    setLoadPage(true);
    let success = [];
    let all_rent_chages = await fetch(`${url}/api/admin/admin-wallet`);
    const allCharge = await all_rent_chages.json();
    if (allCharge.status === 200) {
      allCharge.result.map((item) => {
        success.push(item);
      });
      setFilterData(allCharge.result);
      setSuccessData(allCharge.result);
    } else {
      alert(allCharge.result);
    }
  };

  useEffect(() => {
    getAdminWalletData();
  }, [loadPage]);

  const openNew = () => {
    setAddDialog(true);
  };

  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const headerComplete = (
    <div className="py-2">
      <div className="row">
        <div className="col-lg-3 d-flex">
          <h4 className="m-0">Admin Wallet</h4>
        </div>
        <div className="col-lg-3">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
            />
          </IconField>
        </div>
        <div className="col-lg-3">
          <div className="row">
            <div className="col-lg-6">
              <Calendar
                value={date1}
                onChange={(e) => setDate1(e.value)}
                dateFormat="dd-mm-yy"
                placeholder="From Date"
              />
            </div>
            <div className="col-lg-6">
              <Calendar
                onChange={(e) => {
                  setDate2(e.target.value);
                  showDateWiseData(e.target.value);
                }}
                dateFormat="dd-mm-yy"
                placeholder="To Date"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <button
            onClick={openNew}
            className="btn btn-info btn-sm m-auto w-100"
          >
            <i className="pi pi-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  );

  const showDateWiseData = (datea) => {
    if (date2 !== "") {
      let newDate1 = new Date(date1).toISOString();
      let newDate2 = new Date(datea).toISOString();
      let Datas = [];
      successData.map((item) => {
        let newDate3 = moment(item.transactionDate, "DD-M-YYYY");
        let newDate4 = new Date(newDate3._d).toISOString();

        if (newDate4 >= newDate1 && newDate4 <= newDate2) {
          Datas.push(item);
        }
      });
      setFilterData(Datas);
    } else {
      setLoadPage(true);
      setFilterData(successData);
    }
  };

  const hideDialog = () => {
    setAddDialog(false);
  };

  const SaveData = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/api/admin/add-admin-wallet`, {
      method: "post",
      body: JSON.stringify({ userId: adminId, walletAmount: price }),
      headers: {
        "Content-Type": "application/json",
      },
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
        label="Cancel"
        icon="pi pi-times"
        className="me-1"
        outlined
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="ms-1"
        onClick={SaveData}
      />
    </React.Fragment>
  );
  const dateTime = (rowData) => {
    return rowData.transactionDate + " / " + rowData.transactionTime;
  };

  const showClosing = (rowData) => {
    console.log(rowData);
    if (rowData.openingBalance === undefined || rowData.openingBalance === "") {
      return "";
    } else {
      if (rowData.type === "Credit") {
        return parseInt(rowData.openingBalance) + parseInt(rowData.amount);
      } else {
        return parseInt(rowData.openingBalance) - parseInt(rowData.amount);
      }
    }
  };

  return (
    <div className="adminWallet">
      <Toast ref={toast} />
      <div className="card px-3 UserCardReports">
        <DataTable
          ref={orderCmplt}
          value={filterData}
          dataKey="id"
          paginator
          rows={25}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
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
          <Column field="transactionId" header="Txn ID" sortable></Column>
          <Column
            field={dateTime}
            header="Date / Time"
            body={dateTime}
            sortable
          ></Column>
          {/* <Column field="transactionTime" header="Time" sortable></Column> */}
          <Column field="openingBalance" header="Opening" sortable></Column>
          <Column field="amount" header="Amount" sortable></Column>
          <Column
            field={showClosing}
            header="Closing"
            body={showClosing}
          ></Column>
          <Column
            field="type"
            header="Type"
            bodyStyle={{ color: "blue", fontWeight: "bold" }}
            sortable
          ></Column>
          <Column field="userName" header="User Name"></Column>
          <Column field="reason" header="Reason" sortable></Column>
          <Column
            field="status"
            header="Status"
            bodyStyle={{ color: "green" }}
            sortable
          ></Column>
          <Column
            field="amountStatus"
            header="AmtStatus"
            bodyStyle={{ color: "green" }}
            sortable
          ></Column>
        </DataTable>
      </div>
      <Dialog
        visible={addDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={"Add Amount"}
        modal
        className="p-fluid"
        footer={AddPriceDialogFooter}
        onHide={hideDialog}
      >
        <div className="row">
          <div className="col-lg-12">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminWallet;
