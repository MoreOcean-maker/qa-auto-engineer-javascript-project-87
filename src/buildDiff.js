const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

const buildDiff = (data1, data2) => {
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort()

  const makeNode = (key, type, extras = {}) => ({ key, type, ...extras })

  return keys.map((key) => {
    const inData1 = hasKey(data1, key)
    const inData2 = hasKey(data2, key)

    if (!inData1) {
      return makeNode(key, 'added', { value: data2[key] })
    }

    if (!inData2) {
      return makeNode(key, 'removed', { value: data1[key] })
    }

    const value1 = data1[key]
    const value2 = data2[key]

    const areObjects = val => typeof val === 'object' && val !== null

    if (areObjects(value1) && areObjects(value2)) {
      return makeNode(key, 'nested', { children: buildDiff(value1, value2) })
    }

    if (value1 !== value2) {
      return makeNode(key, 'updated', { oldValue: value1, value: value2 })
    }

    return makeNode(key, 'unchanged', { value: value1 })
  })
}

export default buildDiff
