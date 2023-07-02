import React, { useContext } from "react";
import { fileContext } from "../context";
import TreeNode from "./TreeNode";

const RootNode = () => {
  const { fileData } = useContext(fileContext);

  return (
    <div>
      <TreeNode node={fileData} />
    </div>
  );
};

export default RootNode;
