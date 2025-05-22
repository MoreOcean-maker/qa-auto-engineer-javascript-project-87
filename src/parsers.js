import yaml from 'js-yaml'

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
}

const parse = (data, format) => {
  const parser = parsers[format]
  if (!parser) {
    throw new Error(`Unknown format: ${format}`)
  }
  return parser(data)
}

export default parse
