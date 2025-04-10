import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const parseJSON = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(content);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseJSON(filepath1);
  const obj2 = parseJSON(filepath2);

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
