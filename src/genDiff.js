import getParsedFile from './getParsedFile.js';
import buildDiff from './buildDiff.js';

const stringifyPlain = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'object') return '[complex value]';
  return String(value);
};

const stringifyStylish = (value, depth) => {
  if (typeof value === 'object' && value !== null) {
    const indent = ' '.repeat(4 * (depth + 1));
    const entries = Object.entries(value);
    return `{\n${entries.map(([k, v]) => `${indent}${k}: ${stringifyStylish(v, depth + 1)}`).join('\n')}\n${' '.repeat(4 * depth)}}`;
  }
  return String(value);
};

const formatters = {
  plain: (diff) => {
    const iter = (nodes, parentPath = '') => nodes
      .flatMap((node) => {
        const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key;

        switch (node.type) {
          case 'added':
            return `Property '${currentPath}' was added with value: ${stringifyPlain(node.value)}`;
          case 'removed':
            return `Property '${currentPath}' was removed`;
          case 'updated':
            return `Property '${currentPath}' was updated. From ${stringifyPlain(node.oldValue)} to ${stringifyPlain(node.value)}`;
          case 'nested':
            return iter(node.children, currentPath);
          case 'unchanged':
            return [];
          default:
            throw new Error(`Unknown node type: ${node.type}`);
        }
      })
      .join('\n');

    return iter(diff);
  },

  stylish: (diff) => {
    const iter = (nodes, depth = 1) => {
      const indent = ' '.repeat(4 * depth - 2);
      return nodes.map((node) => {
        switch (node.type) {
          case 'added':
            return `${indent}+ ${node.key}: ${stringifyStylish(node.value, depth)}`;
          case 'removed':
            return `${indent}- ${node.key}: ${stringifyStylish(node.value, depth)}`;
          case 'updated':
            return [
              `${indent}- ${node.key}: ${stringifyStylish(node.oldValue, depth)}`,
              `${indent}+ ${node.key}: ${stringifyStylish(node.value, depth)}`,
            ].join('\n');
          case 'nested':
            return `${indent}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${indent}  }`;
          case 'unchanged':
            return `${indent}  ${node.key}: ${stringifyStylish(node.value, depth)}`;
          default:
            throw new Error(`Unknown node type: ${node.type}`);
        }
      }).join('\n');
    };

    return `{\n${iter(diff)}\n}`;
  },

  json: (diff) => JSON.stringify(diff, null, 2),
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`);
  }

  const data1 = getParsedFile(filepath1);
  const data2 = getParsedFile(filepath2);

  const diff = buildDiff(data1, data2);

  return formatters[formatName](diff);
};

export default genDiff;
