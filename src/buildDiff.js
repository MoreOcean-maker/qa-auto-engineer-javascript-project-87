const createNode = (key, type, value1, value2, children) => {
  const node = { key, type };
  if (children) {
    node.children = children;
  } else if (type === 'updated') {
    node.oldValue = value1;
    node.value = value2;
  } else {
    node.value = value1 !== undefined ? value1 : value2;
  }
  return node;
};

const buildDiff = (data1, data2) => {
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort();

  return keys.map((key) => {
    if (!Object.prototype.hasOwnProperty.call(data1, key)) {
      return createNode(key, 'added', undefined, data2[key]);
    }

    if (!Object.prototype.hasOwnProperty.call(data2, key)) {
      return createNode(key, 'removed', data1[key], undefined);
    }

    const value1 = data1[key];
    const value2 = data2[key];

    if (
      typeof value1 === 'object' && value1 !== null &&
      typeof value2 === 'object' && value2 !== null
    ) {
      return createNode(key, 'nested', undefined, undefined, buildDiff(value1, value2));
    }

    if (value1 !== value2) {
      return createNode(key, 'updated', value1, value2);
    }

    return createNode(key, 'unchanged', value1, undefined);
  });
};

export default buildDiff;
