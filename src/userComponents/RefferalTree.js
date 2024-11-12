import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { url } from "../apiHelper/apiHelper";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const RefferalTree = () => {
  const userId = localStorage.getItem("userId");
  const [data, setConnectedUsers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [tree, setTree] = useState([]);
  const [filteredTree, setFilteredTree] = useState([]);

  // Fetch connected users
  const getAllConnectedUsers = async () => {
    const response = await fetch(`${url}/api/users/all-refer-users`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    
    setConnectedUsers(result.status === 200 ? result.result : []);
  };

  useEffect(() => {
    getAllConnectedUsers();
  }, []);

  // Function to create the entire MLM tree
  const createTree = (sponsorId, users) => {
    return users
      .filter((user) => user.sponsorId === sponsorId)
      .map((user) => ({
        ...user,
        children: createTree(user._id, users),
      }));
  };

  // Generate the full tree initially or based on the selected user
  useEffect(() => {
    if (selectedUser) {
      const generatedTree = [
        {
          ...selectedUser,
          children: createTree(selectedUser._id, data),
        },
      ];
      setTree(generatedTree);
      setFilteredTree(generatedTree);
    } else {
      const generatedTree = createTree(userId, data);
      setTree(generatedTree);
      setFilteredTree(generatedTree);
    }
  }, [selectedUser, data]);

  // Recursive function to filter the tree based on the global filter
  const filterTree = (nodes, term) => {
    return nodes
      .map((node) => {
        const matches =
          node.name.toLowerCase().includes(term) || node.mobile.includes(term);
        const filteredChildren = filterTree(node.children, term);
        if (matches || filteredChildren.length > 0) {
          return { ...node, children: filteredChildren };
        }
        return null;
      })
      .filter((node) => node);
  };

  useEffect(() => {
    const term = globalFilter.toLowerCase();
    setFilteredTree(term ? filterTree(tree, term) : tree);
  }, [globalFilter, tree]);

  // Render Tree Nodes
  const renderNode = (node) => (
    <li key={node._id}>
      <div className="tree-node">
        {node.profile_image ? (
          <img src={`${url}/uploads/${node.profile_image}`} alt={node.name} />
        ) : (
          <img src="./assets/img/profile.png" alt={node.name} />
        )}
        <p className="mb-0 text-success">Usr Id : {node._id}</p>
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

  return (
    <div className="binary-tree overflow-scroll">
      <div className="row">
        <div className="col-lg-8">
          <h4>Sponser ID : {userId}</h4>
        </div>
        <div className="col-lg-4">
          <Dropdown
            value={selectedUser}
            options={data}
            onChange={(e) => setSelectedUser(e.value)}
            optionLabel={(item) => `${item.name} (${item._id})`}
            placeholder="Select User"
            className="form-control"
          />
        </div>
      </div>
      {
        <ul className="d-inline-flex justify-content-between">
          {filteredTree.map((topNode) => renderNode(topNode))}
        </ul>
      }
    </div>
  );
};

export default RefferalTree;
