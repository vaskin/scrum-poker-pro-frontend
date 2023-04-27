export const recursiveUpdateChild = (id, array, data) => {
  return array.map((item) => {
    if (item.child) {
      item.child = recursiveUpdateChild(id, item.child, data);
    }

    if (item.id === id) {
      item.child.push(...data);

      return item;
    }

    return item;
  });
};
