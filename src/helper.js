export function addIdToNode(
  data,
  id,
  initialValue,
  initialPath,
  initialParents
) {
  data = { ...data, _id: id, checked: 0 };
  initialPath = initialPath + `/${data.name}`;

  initialValue[id] = {
    _id: id,
    checked: 0,
    path: initialPath,
    parents: initialParents,
  };
  const newParents = initialParents.concat([id]);
  if (data.children) {
    data.children = data?.children?.map((node) => {
      const x = addIdToNode(node, ++id, initialValue, initialPath, newParents);

      id = x[1];
      return x[0];
    });
  }
  initialValue[data._id].children = data?.children?.map((node) => node._id);
  return [data, id];
}
export function isFolderNode(item) {
  return Object.hasOwn(item, "children");
}
