const getSortedKeys = (obj1, obj2) => (
  Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort()
);

const createNode = (key, type, value, oldValue, children) => ({
  key,
  type,
  value,
  oldValue,
  children,
});

const isObject = (value) => typeof value === 'object' && value !== null;

const deepEqual = (a, b) => {
  if (a === b) {
    return true;
  }
  if (!isObject(a) || !isObject(b)) {
    return false;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every((key) => b.hasOwnProperty(key) && deepEqual(a[key], b[key]));
};

const compareValues = (value1, value2) => {
  const areBothObjects = isObject(value1) && isObject(value2);
  const areEqual = areBothObjects ? deepEqual(value1, value2) : value1 === value2;

  return {
    areBothObjects,
    areEqual,
  };
};

const buildDiff = (data1, data2) => {
  const keys = getSortedKeys(data1, data2);

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const { areBothObjects, areEqual } = compareValues(value1, value2);

    if (!Object.hasOwn(data1, key)) {
      return createNode(key, 'added', value2);
    }

    if (!Object.hasOwn(data2, key)) {
      return createNode(key, 'removed', value1);
    }

    if (areBothObjects) {
      return createNode(key, 'nested', undefined, undefined, buildDiff(value1, value2));
    }

    if (!areEqual) {
      return createNode(key, 'updated', value2, value1);
    }

    return createNode(key, 'unchanged', value1);
  });
};

export default buildDiff;
