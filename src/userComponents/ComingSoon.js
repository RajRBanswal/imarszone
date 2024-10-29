import React, { useEffect, useState } from "react";
import { url } from "../apiHelper/apiHelper";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

const ComingSoon = () => {
  const userId = localStorage.getItem("userId");
  const [data, setConnectedUsers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

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

  // console.log(data);

  useEffect(() => {
    getAllConnectedUsers(userId);
  }, [userId]);

  const createTree = (sponsorId, users) => {
    return users
      .filter((user) => user.sponsorId === sponsorId)
      .map((user) => ({
        ...user,
        children: createTree(user._id, users),
      }));
  };
  

  // Fetch the top-level users with no sponsor
  const topLevelUsers = data.filter((user) => user.sponsorId === userId);
  const [tree, setTree] = useState([]);

  useEffect(() => {
    // Create the MLM tree based on the sponsorId
    const generatedTree = topLevelUsers.map((user) => ({
      ...user,
      children: createTree(user._id, data),
    }));
    setTree(generatedTree);
  }, [data]);

  // Render Tree Nodes
  const renderNode = (node) => {
    return (
      <li key={node._id}>
        <div className="tree-node">
          {node.profile_image ? (
            <img src={`${url}/uploads/${node.profile_image}`} alt={node.name} />
          ) : (
            <img src={`./assets/img/profile.png`} alt={node.name} />
          )}
          <p className="mb-0">{node.name}</p>
          <p className="mb-0">{node.mobile}</p>
          <p className="mb-0 sponsorId">Sp. Id : {node.sponsorId}</p>
        </div>
        {node.children.length > 0 && (
          <ul className="d-inline-flex justify-content-between nodeElement p-0">
            {node.children.map((child) => renderNode(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="binary-tree">
      <div className="row">
        <div className="col-lg-6">
          <h5>Sponsor Id : {userId}</h5>
        </div>
        <div className="col-lg-6">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="form-control"
            />
          </IconField>
        </div>
      </div>
      <ul className="d-inline-flex justify-content-between">
        {tree.map((topNode) => renderNode(topNode))}
      </ul>
    </div>
  );
};

export default ComingSoon;
