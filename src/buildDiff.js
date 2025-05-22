const buildDiff = (data1, data2) => {
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort()

  return keys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!Object.prototype.hasOwnProperty.call(data1, key)) {
      return {
        key,
        type: 'added',
        value: value2,
        oldValue: undefined,
        children: undefined,
      }
    }

    if (!Object.prototype.hasOwnProperty.call(data2, key)) {
      return {
        key,
        type: 'removed',
        value: value1,
        oldValue: undefined,
        children: undefined,
      }
    }

    if (
      typeof value1 === 'object'
      && value1 !== null
      && typeof value2 === 'object'
      && value2 !== null
    ) {
      return {
        key,
        type: 'nested',
        value: undefined,
        oldValue: undefined,
        children: buildDiff(value1, value2),
      }
    }

    if (value1 !== value2) {
      return {
        key,
        type: 'updated',
        value: value2,
        oldValue: value1,
        children: undefined,
      }
    }

    return {
      key,
      type: 'unchanged',
      value: value1,
      oldValue: undefined,
      children: undefined,
    }
  })
}

export default buildDiff
