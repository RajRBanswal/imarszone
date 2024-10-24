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

const AllPackages = () => {
  const [points, setPoints] = useState(0);
  const [rewardPrice, setRewardPrice] = useState(0);
  const [type, setType] = useState("Refer Earn");
  const [level, setLevel] = useState(1);

  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [successData, setSuccessData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const orderCmplt = useRef(null);
  const adminId = localStorage.getItem("adminId");
  let success = [];
  const [filterData, setFilterData] = useState([]);
  const [editPoint, setEditPoint] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRewardsPriceData = async () => {
    let all_transaction = await fetch(`${url}/api/admin/all-point-prices`);
    const allTransaction = await all_transaction.json();
    if (allTransaction.status === 201) {
      allTransaction.result.map((item) => {
        success.push(item);
      });
      setFilterData(allTransaction.result);
      setSuccessData(allTransaction.result);
    } else {
      alert(allTransaction.result);
    }
  };

  useEffect(() => {
    getRewardsPriceData();
  }, [getRewardsPriceData]);

  const openNew = () => {
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
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="me-1"
          severity="info"
          onClick={() => {
            setEditPoint(options);
            setEditDialog(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          className="ms-1"
          severity="danger"
          onClick={() => deletePoints(options._id)}
        />
      </>
    );
  };

  const headerComplete = (
    <div className="py-2">
      <div className="row">
        <div className="col-lg-6 d-flex">
          <h4 className="m-0">Points</h4>
        </div>
        <div className="col-lg-4">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
            />
          </IconField>
        </div>
        <div className="col-lg-2">
          <Button
            label="Add"
            icon="pi pi-plus"
            className="me-1"
            onClick={openNew}
          />
        </div>
      </div>
    </div>
  );
  const hideDialog = () => {
    setAddDialog(false);
  };
  const hideEditDialog = () => {
    setEditDialog(false);
  };

  const SaveData = async () => {
    const response = await fetch(`${url}/api/admin/add-point-prices`, {
      method: "post",
      body: JSON.stringify({ points, rewardPrice, adminId, type, level }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.status === 201) {
      alert(result.result);
      hideDialog();
      setPoints("");
      setRewardPrice("");
      setType("");
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
        severity="danger"
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
  const UpdateData = async () => {
    const response = await fetch(`${url}/api/admin/update-point-prices`, {
      method: "post",
      body: JSON.stringify({
        id: editPoint._id,
        points: points,
        rewardPrice: rewardPrice,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.status === 201) {
      hideEditDialog();
      setPoints("");
      setRewardPrice("");
      alert(result.result);
    } else {
      alert(result.result);
    }
  };

  const EditPriceDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="me-1"
        severity="danger"
        onClick={hideEditDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="ms-1"
        onClick={UpdateData}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />

      <div className="card UserCardReports">
        <DataTable
          ref={orderCmplt}
          value={filterData}
          dataKey="id"
          paginator
          rows={10}
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
          <Column
            field="points"
            header="Points"
            bodyStyle={{ fontWeight: "bold", textAlign: "center" }}
            headerStyle={{ textAlign: "center" }}
            sortable
          ></Column>
          <Column
            field="level"
            header="Level"
            bodyStyle={{ fontWeight: "bold", textAlign: "center" }}
            sortable
          ></Column>
          <Column
            field="price"
            header="Price"
            bodyStyle={{ fontWeight: "bold", textAlign: "center" }}
            sortable
          ></Column>
          <Column
            field="type"
            header="Type"
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
      <Dialog
        visible={addDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={
          type === "Refer Earn" ? "Refer Earn" : "Add Reward Points Price"
        }
        modal
        className="p-fluid"
        footer={AddPriceDialogFooter}
        onHide={hideDialog}
      >
        <div className="px-3 pb-3">
          <div className="row">
            <div className="col-lg-12 mb-3">
              <label>Select Type</label>
              <select
                className="form-control form-select"
                onChange={(e) => setType(e.target.value)}
              >
                <option value={""}>Select One</option>
                <option value={"Refer Earn"}>Refer & Earn</option>
                <option value={"Reward Point / Price"}>
                  Reward Point / Price
                </option>
              </select>
            </div>
            {type === "Refer Earn" ? (
              <>
                <div className="col-lg-12">
                  <label>Select Level</label>
                  <select
                    className="form-select"
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option value={""}>Select One</option>
                    <option value={"1"}>Level 1</option>
                    <option value={"2"}>Level 2</option>
                    <option value={"3"}>Level 3</option>
                    <option value={"4"}>Level 4</option>
                    <option value={"5"}>Level 5</option>
                  </select>
                </div>
                <div className="col-lg-12 mt-3">
                  <label>Refer Price</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Price"
                    onChange={(e) => setRewardPrice(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="col-lg-5">
                  <label>Points</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Point"
                    onChange={(e) => setPoints(e.target.value)}
                  />
                </div>
                <div className="col-lg-1 text-center">
                  <p></p>
                  <p className="mt-4" style={{ fontSize: 25 }}>
                    /
                  </p>
                </div>
                <div className="col-lg-6">
                  <label>Price (in RS.)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Price"
                    onChange={(e) => setRewardPrice(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={
          editPoint && editPoint.type === "Refer Earn"
            ? "Updated Refer Earn"
            : "Update Reward Points Price"
        }
        modal
        className="p-fluid"
        footer={EditPriceDialogFooter}
        onHide={hideEditDialog}
      >
        <div className="row">
          {editPoint && editPoint.type === "Refer Earn" ? (
            <>
              <div className="col-lg-12">
                <label>Level</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Level"
                  defaultValue={editPoint && editPoint.level}
                  readOnly
                />
              </div>
              <div className="col-lg-12">
                <label>Refer Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Refer Price"
                  onChange={(e) => setRewardPrice(e.target.value)}
                  defaultValue={editPoint && editPoint.price}
                />
              </div>
            </>
          ) : (
            <>
              <div className="col-lg-5">
                <label>Points</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Point"
                  onChange={(e) => setPoints(e.target.value)}
                  defaultValue={editPoint && editPoint.points}
                />
              </div>
              <div className="col-lg-1 text-center">
                <p></p>
                <p className="mt-4" style={{ fontSize: 25 }}>
                  /
                </p>
              </div>
              <div className="col-lg-6">
                <label>Price (in RS.)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Price"
                  onChange={(e) => setRewardPrice(e.target.value)}
                  defaultValue={editPoint && editPoint.price}
                />
              </div>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default AllPackages;
