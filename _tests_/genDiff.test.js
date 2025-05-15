import { fileURLToPath } from 'url'
import path from 'path'
import genDiff from '../src/genDiff.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const getFixturePath = filename => path.join(dirname, '..', '__fixtures__', filename)

describe('genDiff', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')

  test('stylish format (default)', () => {
    const result = genDiff(filepath1, filepath2)
    expect(result).toMatchSnapshot()
  })

  test('plain format', () => {
    const result = genDiff(filepath1, filepath2, 'plain')
    expect(result).toMatchSnapshot()
  })

  test('json format', () => {
    const result = genDiff(filepath1, filepath2, 'json')
    expect(() => JSON.parse(result)).not.toThrow()
    expect(result).toMatchSnapshot()
  })

  test('throws error for unknown format', () => {
    expect(() => genDiff(filepath1, filepath2, 'unknown')).toThrow(
      'Unknown format: unknown'
    )
  })
})
