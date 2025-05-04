import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);

describe('genDiff', () => {
  test('plain format comparison', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    
    // Убедитесь что файлы существуют
    expect(() => readFileSync(file1)).not.toThrow();
    expect(() => readFileSync(file2)).not.toThrow();

    const result = genDiff(file1, file2, 'plain');
    expect(result).toMatchSnapshot();
  });
});
