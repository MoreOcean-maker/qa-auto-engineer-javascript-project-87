const buildDiff = (data1, data2) => {
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort();

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const base = { key, oldValue: undefined, children: undefined };

    if (!Object.prototype.hasOwnProperty.call(data1, key)) {
      return { ...base, type: 'added', value: value2 };
    }

    if (!Object.prototype.hasOwnProperty.call(data2, key)) {
      return { ...base, type: 'removed', value: value1 };
    }

    const bothObjects = typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null;

    if (bothObjects) {
      return { ...base, type: 'nested', children: buildDiff(value1, value2) };
    }

    if (value1 !== value2) {
      return { ...base, type: 'updated', value: value2, oldValue: value1 };
    }

    return { ...base, type: 'unchanged', value: value1 };
  });
};

export default buildDiff;
