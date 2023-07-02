import React, { createContext, useState } from "react";
import { addIdToNode } from "./helper";

export const fileContext = createContext();

const Context = ({ children }) => {
  const data = require("./sampleData/TestData.json");
  const initialValue = [];
  let dataWithId = addIdToNode(data, 0, initialValue, "", [])[0];
  const [nodeCheckStatus, setNodeCheckStatus] = useState(initialValue);
  const [fileData, setFileData] = useState(dataWithId);

  function setAllChildren(node, val) {
    const checkvalues = nodeCheckStatus;
    checkvalues[node._id].checked = val;
    setNodeCheckStatus(checkvalues);
    node?.children?.forEach((node) => {
      setAllChildren(node, val);
    });
  }
  function updateObjectState(data) {
    data.checked = nodeCheckStatus[data._id].checked;
    if (data.children) {
      data.children = data?.children?.map((data) => {
        return updateObjectState(data);
      });
    }
    return data;
  }
  function childrenCheckStatus(id) {
    let anyChildChecked = false;
    let allChildrenChecked = true;
    nodeCheckStatus[id]?.children?.forEach((child) => {
      anyChildChecked = nodeCheckStatus[child].checked || anyChildChecked;
      allChildrenChecked = nodeCheckStatus[child].checked && allChildrenChecked;
    });
    return { allChildrenChecked, anyChildChecked };
  }
  function setIndeterminate() {
    const checkvalues = nodeCheckStatus;
    checkvalues
      ?.slice()
      ?.reverse()
      ?.forEach((node) => {
        if (node.children) {
          const { allChildrenChecked, anyChildChecked } = childrenCheckStatus(
            node._id
          );
          node.checked = allChildrenChecked ? 1 : anyChildChecked ? 0.5 : 0;
        }
      });
    setNodeCheckStatus(checkvalues);
  }
  function handleCheck(node, e) {
    const val = e.target.checked ? 1 : 0;
    setAllChildren(node, val);
    setIndeterminate();
    const updatedState = fileData;
    setFileData(updateObjectState(updatedState));
  }
  function handleSubmit() {
    for (const node in nodeCheckStatus) {
      if (nodeCheckStatus[node].checked === 1)
        console.log(nodeCheckStatus[node].path);
    }
  }

  return (
    <fileContext.Provider
      value={{
        nodeCheckStatus,
        setNodeCheckStatus,
        fileData,
        handleSubmit,
        handleCheck,
        childrenCheckStatus,
      }}
    >
      {children}
    </fileContext.Provider>
  );
};

export default Context;
