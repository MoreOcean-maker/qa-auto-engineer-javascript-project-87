import fs from 'fs'
import path from 'path'
import { parse } from './parsers.js'

const getParsedFile = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8')
  const ext = path.extname(filepath)
  return parse(data, ext)
}

export default getParsedFile
