import plain from './plain.js';
import stylish from './stylish.js';

export default (formatName) => {
  switch (formatName) {
    case 'plain':
      return plain;
    case 'stylish':
      return stylish;
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};
