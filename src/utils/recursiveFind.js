export const recursiveFind = (array = [], id) => {
  let result = null;

  const recursiveFindInner = (array, id) =>
    array.forEach((item) => {
      if (item.id === id) {
        result = item;
      } else if (item.child) {
        recursiveFindInner(item.child, id);
      }
    });

  recursiveFindInner(array, id);

  return result;
};
