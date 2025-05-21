import getParsedFile from './getParsedFile.js'
import buildDiff from './buildDiff.js'
import format from './formatters/index.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getParsedFile(filepath1)
  const data2 = getParsedFile(filepath2)
  const diff = buildDiff(data1, data2)

  return format(diff, formatName)
}

export default genDiff
