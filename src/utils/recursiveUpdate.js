export const recursiveUpdate = (array, data, fields = []) => {
  return array.map((item) => {
    if (item.child) {
      item.child = recursiveUpdate(item.child, data);
    }

    if (item.id === data.id) {
      if (fields.length) {
        for (const field of fields) {
          item[field] = data[field];
        }
      } else {
        return data;
      }
    }

    return item;
  });
};
