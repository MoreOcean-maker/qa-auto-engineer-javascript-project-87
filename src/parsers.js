import fs from 'fs';
import path from 'path';

const parseFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const extname = path.extname(filepath);

  if (extname === '.json') {
    return JSON.parse(fileContent);
  }

  throw new Error(`Unsupported file format: ${extname}`);
};

export default parseFile;
