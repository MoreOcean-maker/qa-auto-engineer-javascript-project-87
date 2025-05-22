import fs from 'fs'
import path from 'path'
import parse from './parsers.js'

const getParsedFile = (filepath) => {
  const rawData = fs.readFileSync(filepath, 'utf-8')
  const ext = path.extname(filepath).slice(1)
  return parse(rawData, ext)
}

export default getParsedFile
