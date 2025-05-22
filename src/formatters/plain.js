const stringifyPlain = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'object') return '[complex value]'
  return String(value)
}

const plain = (diff) => {
  const iter = (nodes, parentPath = '') => nodes
    .flatMap(({ key, type, value, oldValue, children }) => {
      const currentPath = parentPath ? `${parentPath}.${key}` : key

      switch (type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringifyPlain(value)}`
        case 'removed':
          return `Property '${currentPath}' was removed`
        case 'updated':
          return `Property '${currentPath}' was updated. From ${stringifyPlain(oldValue)} to ${stringifyPlain(value)}`
        case 'nested':
          return iter(children, currentPath)
        case 'unchanged':
          return []
        default:
          throw new Error(`Unknown node type: ${type}`)
      }
    })
    .join('\n')

  return iter(diff)
}

export default plain
