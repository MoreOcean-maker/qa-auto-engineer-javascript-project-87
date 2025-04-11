import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml'; 

const getFormat = (filepath) => path.extname(filepath).slice(1); 
const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default (filepath) => {
  const fullPath = getAbsolutePath(filepath);
  const format = getFormat(filepath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return parse(content, format);
};
