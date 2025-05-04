import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';

// Временная реализация форматтеров прямо в файле
const formatters = {
  plain: (diff) => {
    const iter = (nodes, parentPath = '') => nodes
      .flatMap((node) => {
        const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key;
        
        switch (node.type) {
          case 'added':
            return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
          case 'removed':
            return `Property '${currentPath}' was removed`;
          case 'updated':
            return `Property '${currentPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.value)}`;
          case 'nested':
            return iter(node.children, currentPath);
          case 'unchanged':
            return [];
          default:
            throw new Error(`Unknown node type: ${node.type}`);
        }
      })
      .join('\n');

    const stringify = (value) => {
      if (value === null) return 'null';
      if (typeof value === 'object') return '[complex value]';
      return String(value);
    };

    return iter(diff);
  },
  stylish: (diff) => {
    // Базовая реализация stylish формата
    const iter = (nodes, depth = 1) => {
      const indent = ' '.repeat(4 * depth - 2);
      return nodes.map((node) => {
        switch (node.type) {
          case 'added':
            return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
          case 'removed':
            return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
          case 'updated':
            return [
              `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
              `${indent}+ ${node.key}: ${stringify(node.value, depth)}`
            ].join('\n');
          case 'nested':
            return `${indent}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${indent}  }`;
          default:
            return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
        }
      }).join('\n');
    };

    const stringify = (value, depth) => {
      if (typeof value === 'object' && value !== null) {
        const indent = ' '.repeat(4 * depth);
        const entries = Object.entries(value);
        return `{\n${entries.map(([k, v]) => `${indent}  ${k}: ${stringify(v, depth + 1)}`).join('\n')}\n${indent}}`;
      }
      return String(value);
    };

    return `{\n${iter(diff)}\n}`;
  }
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  // Проверка существования форматера
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`);
  }

  // Чтение и парсинг файлов
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  // Построение различий
  const diff = buildDiff(data1, data2);

  // Применение выбранного форматера
  return formatters[formatName](diff);
};

export default genDiff;