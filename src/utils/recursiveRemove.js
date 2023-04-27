export const recursiveRemove = (array, id) => {
  return array
    .map((item) => item)
    .filter((item) => {
      if (item.child) {
        item.child = recursiveRemove(item.child, id);
      }

      return item.id !== id;
    });
};
