export function regroupObjects(flatArray) {
  const rootNodes = [];

  // Hash table to store objects indexed by their IDs
  const hashTable = {};

  // Populate hash table and create children arrays
  flatArray.forEach((obj) => {
    // hashTable[obj.mpath] = { ...obj, children: [] };
    hashTable[obj.mpath] = { ...obj };
  });

  // Iterate over the flat array to establish parent-child relationships
  flatArray.forEach((obj) => {
    if (!!obj?.mpath) {
      const parentId = obj.mpath.includes('.')
        ? obj.mpath.slice(0, obj.mpath.lastIndexOf('.'))
        : null;
      if (parentId !== null) {
        if (hashTable[parentId].children) {
          hashTable[parentId].children.push(hashTable[obj.mpath]);
        } else {
          hashTable[parentId].children = [hashTable[obj.mpath]];
        }
      } else {
        rootNodes.push(hashTable[obj.mpath]);
      }
    }
  });

  return rootNodes;
}

export function compareVersionStrings(objA: any, objB: any) {
  const pathsA = objA.mpath?.split('.')?.map((part: any) => parseInt(part, 10));
  const pathsB = objB.mpath?.split('.')?.map((part: any) => parseInt(part, 10));
  for (let i = 0; i < Math.max(pathsA.length, pathsB.length); i++) {
    const numA = pathsA[i] || 0;
    const numB = pathsB[i] || 0;
    if (numA < numB) return -1;
    if (numA > numB) return 1;
  }
  return 0;
}
