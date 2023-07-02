import React, { Component } from "react";
import { isFolderNode } from "../helper";
import { fileContext } from "../context";
import {
  AiOutlineFileText,
  AiFillFolder,
  AiFillFolderOpen,
} from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";

export class TreeNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }
  static contextType = fileContext;
  componentDidUpdate(prevProps) {
    if (prevProps.node !== this.props.node) {
      this.forceUpdate();
    }
  }
  render() {
    const { isOpen } = this.state;
    const { node } = this.props;
    const { handleCheck } = this.context;
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
            onClick={() =>
              hasChildren &&
              this.setState((prevState) => ({
                isOpen: !prevState.isOpen,
              }))
            }
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
  }
}

export default TreeNode;
