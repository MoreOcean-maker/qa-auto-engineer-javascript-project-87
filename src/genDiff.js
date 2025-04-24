import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const lines = keys.map((key) => {
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

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
