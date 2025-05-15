const stringify = value => {
  if (value === null) return 'null'
  if (typeof value === 'object') return '[complex value]'
  return String(value)
}

const plain = diff => {
  const iter = (nodes, parentPath = '') => nodes
    .flatMap((node) => {
      const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key

      switch (node.type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(node.value)}`
        case 'removed':
          return `Property '${currentPath}' was removed`
        case 'updated':
          return `Property '${currentPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.value)}`
        case 'nested':
          return iter(node.children, currentPath)
        case 'unchanged':
          return []
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })
    .join('\n')

  return iter(diff)
}

export default plain
