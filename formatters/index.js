import plain from './plain.js';
import stylish from './stylish.js';

const formatters = {
  plain,
  stylish,
};

export default (formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter;
};