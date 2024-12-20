import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { url } from "../apiHelper/apiHelper";

const MLMTree = ({ data, userId }) => {
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
      <h5>Sponsor Id : {userId}</h5>
      <ul className="d-inline-flex justify-content-between">
        {tree.map((topNode) => renderNode(topNode))}
      </ul>
    </div>
  );
};

export default MLMTree;
