const stringifyStylish = (value, depth) => {
  if (typeof value === 'object' && value !== null) {
    const indent = ' '.repeat(4 * (depth + 1))
    const entries = Object.entries(value)
    return `{\n${entries.map(([k, v]) => `${indent}${k}: ${stringifyStylish(v, depth + 1)}`).join('\n')}\n${' '.repeat(4 * depth)}}`
  }
  return String(value)
}

const stylish = (diff) => {
  const iter = (nodes, depth = 1) => {
    const indent = ' '.repeat(4 * depth - 2)
    return nodes.map((node) => {
      switch (node.type) {
        case 'added':
          return `${indent}+ ${node.key}: ${stringifyStylish(node.value, depth)}`
        case 'removed':
          return `${indent}- ${node.key}: ${stringifyStylish(node.value, depth)}`
        case 'updated':
          return [
            `${indent}- ${node.key}: ${stringifyStylish(node.oldValue, depth)}`,
            `${indent}+ ${node.key}: ${stringifyStylish(node.value, depth)}`,
          ].join('\n')
        case 'nested':
          return `${indent}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${indent}  }`
        case 'unchanged':
          return `${indent}  ${node.key}: ${stringifyStylish(node.value, depth)}`
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    }).join('\n')
  }

  return `{\n${iter(diff)}\n}`
}

export default stylish
