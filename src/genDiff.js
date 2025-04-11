import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const result = keys.map((key) => {
    if (!_.has(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (!_.has(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    return `    ${key}: ${obj1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;


