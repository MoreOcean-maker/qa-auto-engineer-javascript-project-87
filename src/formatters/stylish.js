const INDENT_SIZE = 4
const INDENT = ' '

const getIndent = (depth, offset = 0) => INDENT.repeat(depth * INDENT_SIZE - offset)

const stringifyValue = (value, depth) => {
  if (value === null || typeof value !== 'object') {
    return String(value)
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${getIndent(depth + 1)}${key}: ${stringifyValue(val, depth + 1)}`,
  )

  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`
}

const formatLine = (sign, key, value, depth) =>
  `${getIndent(depth, 2)}${sign} ${key}: ${stringifyValue(value, depth)}`

const formatNode = (node, depth, iter) => {
  const { type, key, value, oldValue, children } = node

  switch (type) {
    case 'added':
      return formatLine('+', key, value, depth)
    case 'removed':
      return formatLine('-', key, value, depth)
    case 'unchanged':
      return formatLine(' ', key, value, depth)
    case 'updated':
      return [
        formatLine('-', key, oldValue, depth),
        formatLine('+', key, value, depth),
      ].join('\n')
    case 'nested':
      return `${getIndent(depth)}  ${key}: {\n${iter(children, depth + 1)}\n${getIndent(depth)}  }`
    default:
      throw new Error(`Unknown type: ${type}`)
  }
}

const stylish = (diff) => {
  const iter = (nodes, depth = 1) => nodes.map(node => formatNode(node, depth, iter)).join('\n')
  return `{\n${iter(diff)}\n}`
}

export default stylish
