import path from 'path';
import fs from 'fs';

const getFormat = (filepath) => path.extname(filepath).slice(1); // "json"
const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const parse = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  throw new Error(`Unknown format: ${format}`);
};

export default (filepath) => {
  const fullPath = getAbsolutePath(filepath);
  const format = getFormat(filepath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return parse(content, format);
};
