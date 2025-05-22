const formatValue = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'object' && !Array.isArray(value)) return '[complex value]'
  return String(value)
}

const buildPropertyPath = (parentPath, key) =>
  parentPath ? `${parentPath}.${key}` : key

const createDiffMessage = {
  added: (path, value) => `Property '${path}' was added with value: ${formatValue(value)}`,
  removed: path => `Property '${path}' was removed`,
  updated: (path, oldValue, value) =>
    `Property '${path}' was updated. From ${formatValue(oldValue)} to ${formatValue(value)}`,
  nested: (children, path, iter) => iter(children, path),
  unchanged: () => [],
}

const plain = (diff) => {
  const iter = (nodes, parentPath = '') => nodes
    .flatMap((node) => {
      const { key, type, value, oldValue, children } = node
      const currentPath = buildPropertyPath(parentPath, key)

      switch (type) {
        case 'added':
          return createDiffMessage.added(currentPath, value)
        case 'removed':
          return createDiffMessage.removed(currentPath)
        case 'updated':
          return createDiffMessage.updated(currentPath, oldValue, value)
        case 'nested':
          return createDiffMessage.nested(children, currentPath, iter)
        case 'unchanged':
          return createDiffMessage.unchanged()
        default:
          throw new Error(`Unknown node type: ${type}`)
      }
    })
    .join('\n')

  return iter(diff)
}

export default plain
