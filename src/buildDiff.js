const buildDiff = (data1, data2) => {
  const keys = new Set([...Object.keys(data1), ...Object.keys(data2)]);
  return Array.from(keys).map((key) => {
    if (!(key in data2)) {
      return {
        key,
        type: 'removed',
        value: data1[key],
      };
    }
    if (!(key in data1)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    if (data1[key] === data2[key]) {
      return {
        key,
        type: 'unchanged',
        value: data1[key],
      };
    }
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return {
        key,
        type: 'nested',
        children: buildDiff(data1[key], data2[key]),
      };
    }
    return {
      key,
      type: 'updated',
      oldValue: data1[key],
      value: data2[key],
    };
  });
};

export default buildDiff;
