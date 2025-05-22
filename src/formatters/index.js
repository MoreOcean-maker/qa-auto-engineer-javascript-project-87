import plain from './plain.js'
import stylish from './stylish.js'
import json from './json.js'

const formatters = { plain, stylish, json }

const format = (diff, formatName = 'stylish') => {
  const formatter = formatters[formatName]
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatter(diff)
}

export default format
