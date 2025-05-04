import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/genDiff.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(dirname, '..', '_fixtures_', filename);

describe('genDiff', () => {
  test('correctly compares two JSON files', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file2.json');
    const result = genDiff(file1Path, file2Path);
    expect(result).toMatchInlineSnapshot(`
      "{
          host: hexlet.io
        - timeout: 50
        + timeout: 20
        - proxy: 123.234.53.22
        - follow: false
        + verbose: true
      }"
    `);
  });
});
