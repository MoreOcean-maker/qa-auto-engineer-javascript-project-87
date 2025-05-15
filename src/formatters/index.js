import plain from './plain.js';
import json from './json.js';

const formatters = {
  plain,
  json,
};

export default (formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter;
};
