
export const findNodeById = (nodes, id) => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const findNodePath = (nodes, targetId, currentPath = []) => {
  for (const node of nodes) {
    if (node.id === targetId) {
      return [...currentPath, node.label];
    }
    if (node.children) {
      const foundPath = findNodePath(node.children, targetId, [...currentPath, node.label]);
      if (foundPath) return foundPath;
    }
  }
  return null;
};

// 遞迴取得節點下所有檔案 ID
export const getAllFileIds = (node, allFiles) => {
  let ids = allFiles.filter(f => f.folderId === node.id).map(f => f.id);
  if (node.children) {
    node.children.forEach(child => {
      ids = [...ids, ...getAllFileIds(child, allFiles)];
    });
  }
  return ids;
};
