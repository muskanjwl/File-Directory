import React, { useState, useContext } from "react";
import { isFolderNode } from "../helper";
import { fileContext } from "../context";
import {
  AiOutlineFileText,
  AiFillFolder,
  AiFillFolderOpen,
} from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";

const TreeNode = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { handleCheck } = useContext(fileContext);
  const hasChildren = isFolderNode(node);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Checkbox
          size="small"
          onChange={(e) => {
            handleCheck(node, e);
          }}
          checked={node.checked === 1}
          indeterminate={node.checked === 0.5}
        />
        <div
          onClick={() => hasChildren && setIsOpen((prev) => !prev)}
          style={{ display: "flex", alignItems: "center" }}
        >
          {hasChildren ? (
            isOpen ? (
              <AiFillFolderOpen />
            ) : (
              <AiFillFolder />
            )
          ) : (
            <AiOutlineFileText />
          )}
          {node.name}
        </div>
      </div>
      <ul>
        {hasChildren &&
          isOpen &&
          node.children.map((node, index) => {
            return (
              <li key={index}>
                <TreeNode node={node} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TreeNode;
