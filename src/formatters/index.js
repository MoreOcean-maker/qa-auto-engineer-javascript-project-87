import plain from './plain.js'
import stylish from './stylish.js'
import json from './json.js'

const formatters = {
  plain,
  stylish,
  json,
}

const format = (diff, formatName = 'stylish') => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatters[formatName](diff)
}

export default format
