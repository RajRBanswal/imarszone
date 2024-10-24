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
import { Tree } from "primereact/tree";
import MLMTree from "./MLMTree";

const UsersWithReferenceTree = () => {
  const [users, setUsers] = useState(null);
  const [usersDialog, setUsersDialog] = useState(false);
  const [user, setUser] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");

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
    setSelectedUserId(rowData._id);
    getAllConnectedUsers(rowData._id);
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

  const statusBodyTemplate = (rowData) => {
    let abc = (
      <>
        <p>Card Number</p>
        <p>{rowData.cardNumber}</p>
      </>
    );
    return <Tag value={abc} severity={getSeverity(rowData)}></Tag>;
  };

  const deleteUser = (rowData) => {};

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          className="mr-2"
          onClick={() => openDialog(rowData)}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          onClick={() => deleteUser(rowData)}
        />
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

  const getAllConnectedUsers = async (userId) => {
    const response = await fetch(`${url}/api/users/all-refer-users`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.status === 200) {
      setConnectedUsers(result.result);
    } else {
      setConnectedUsers(result.result);
    }
  };

  console.log(connectedUsers);
  
  const [nodes, setNodes] = useState([]);

  // Helper function to build tree nodes recursively
  const buildTree = (users, parentId = null) => {
    return users
      .filter((user) => user.referenceId === parentId)
      .map((user) => ({
        key: user._id.$oid,
        label: `${user.name} (${user.mobile})`,
        icon: "pi pi-user",
        children: buildTree(users, user._id.$oid),
      }));
  };

  // Initialize the tree data structure on component mount
  React.useEffect(() => {
    const treeData = buildTree(connectedUsers);
    setNodes(treeData);
  }, [connectedUsers]);

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
          <Column field="name" header="Name" sortable></Column>
          <Column
            field="profile_image"
            header="Image"
            body={imageBodyTemplate}
          ></Column>
          <Column
            field="cardStatus"
            header="Card Status"
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
        style={{ width: "90%" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="All User Connected"
        modal
        className="p-fluid"
        // footer={{}}
        onHide={hideDialog}
      >
        {/* <Tree
          className="custom-tree"
          value={userTreeNodes}
          nodeTemplate={nodeTemplate} // Use the custom template for rendering
          selectionMode="single"
          selectionKeys={selectedNode}
          onSelectionChange={(e) => setSelectedNode(e.value)}
        /> */}
        <MLMTree data={connectedUsers} userId={selectedUserId} />
      </Dialog>
    </>
  );
};

export default UsersWithReferenceTree;
