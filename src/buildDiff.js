const buildDiff = (data1, data2) => {
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort();

  return keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }

    const value1 = data1[key];
    const value2 = data2[key];

    if (typeof value1 === 'object' && value1 !== null
     && typeof value2 === 'object' && value2 !== null) {
      return { key, type: 'nested', children: buildDiff(value1, value2) };
    }

    if (value1 !== value2) {
      return { key, type: 'updated', oldValue: value1, value: value2 };
    }

    return { key, type: 'unchanged', value: value1 };
  });
};

export default buildDiff;


