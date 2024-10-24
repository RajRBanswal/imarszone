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
import MLMTree from "../components/MLMTree";

const AllReferUser = () => {
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [usersDialog, setUsersDialog] = useState(false);
  const [user, setUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const toast = useRef(null);
  const dt = useRef(null);

  const getAllUsers = async () => {
    const response = await fetch(`${url}/api/users/all-refer-users`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.status === 200) {
      setUsers(result.result);
    } else {
      setUsers(result.result);
    }
  };

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
  const [selectedNode, setSelectedNode] = useState("");

  useEffect(() => {
    getAllUsers();
  }, [url]);

  const openDialog = (rowData) => {
    setUser(rowData);
    setUsersDialog(true);
    setSelectedNode(rowData._id);
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

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          className="mr-2"
          onClick={() => openDialog(rowData)}
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
      <h4 className="m-0">All Reffered Users</h4>
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

  // // Example tree nodes based on the connected users' data.
  // const userTreeNodes = connectedUsers.map((user, index) => ({
  //   key: user._id,
  //   label: `User ${index + 1} - ${user.name}`,
  //   children: [
  //     {
  //       key: `${user._id}_image`,
  //       label: "Profile Image",
  //       data: { profile_image: `${url}/uploads/${user.profile_image}` },
  //     },
  //     {
  //       key: `${user._id}_status`,
  //       label: `Card Status: ${user.cardStatus}`,
  //       icon: "pi pi-id-card",
  //     },
  //   ],
  // }));

  // const nodeTemplate = (node) => {
  //   if (node.key.includes("_image")) {
  //     // For image nodes, render the profile image
  //     return (
  //       <span>
  //         <img
  //           src={node.data.profile_image}
  //           alt="profile"
  //           style={{
  //             width: "40px",
  //             height: "40px",
  //             borderRadius: "50%",
  //             marginRight: "10px",
  //           }}
  //         />
  //         {node.label}
  //       </span>
  //     );
  //   } else {
  //     // For other nodes, render text normally
  //     return <span>{node.label}</span>;
  //   }
  // };

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
        style={{ width: "80%" }}
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
              {user.cardStatus === "Done" ? (
                <strong className="text-success">Done</strong>
              ) : (
                <strong className="text-warning">Pending</strong>
              )}
            </td>
          </tr>
          {user.cardStatus === "Done" ? (
            <tr>
              <th>Card No.</th>
              <td>{user.cardNumber}</td>
              <th>Approved / Expiry Date</th>
              <td>
                {user.cardApprovedDate} / {user.cardExpiryDate}
              </td>
            </tr>
          ) : (
            ""
          )}
        </table>

        <div className="card p-3">
          <h4>All User Connected</h4>
          <hr className="my-1" />
          {/* <Tree
            className="custom-tree"
            value={userTreeNodes}
            nodeTemplate={nodeTemplate} // Use the custom template for rendering
            selectionMode="single"
            selectionKeys={selectedNode}
            onSelectionChange={(e) => setSelectedNode(e.value)}
          /> */}
          <MLMTree data={connectedUsers} userId={selectedNode} />
        </div>
      </Dialog>
    </>
  );
};

export default AllReferUser;
