import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff';

const filepath1 = path.resolve('__fixtures__', 'file1.json');
const filepath2 = path.resolve('__fixtures__', 'file2.json');

test('correctly compares two JSON files', () => {
  const file1 = JSON.parse(fs.readFileSync(filepath1, 'utf8'));
  const file2 = JSON.parse(fs.readFileSync(filepath2, 'utf8'));
  const result = genDiff(file1, file2);
  const expectedResult = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }`;

  expect(result).toBe(expectedResult);
});
