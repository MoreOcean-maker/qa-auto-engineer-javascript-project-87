import yaml from 'js-yaml'

export const parseJSON = data => JSON.parse(data)

export const parseYAML = data => yaml.load(data)

export const parse = (data, ext) => {
  switch (ext) {
    case '.json':
      return parseJSON(data)
    case '.yml':
    case '.yaml':
      return parseYAML(data)
    default:
      throw new Error(`Unsupported file extension: ${ext}`)
  }
}
