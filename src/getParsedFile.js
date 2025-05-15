import path from 'path'
import fs from 'fs'
import parse from './parsers.js'

const getParsedFile = (filepath) => {
  const absolutePath = path.resolve(filepath)
  const data = fs.readFileSync(absolutePath, 'utf-8')
  const extname = path.extname(filepath).slice(1)

  return parse(data, extname)
}

export default getParsedFile
