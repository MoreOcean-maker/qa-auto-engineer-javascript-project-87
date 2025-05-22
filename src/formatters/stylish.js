const INDENT_SIZE = 4;
const INDENT_SYMBOL = ' ';

// Универсальная функция для генерации отступов
const getIndent = (depth, offset = 0) => INDENT_SYMBOL.repeat(depth * INDENT_SIZE - offset);

// Форматирование значений (примитивных и объектов)
const stringifyValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const lines = Object.entries(value).map(([key, val]) => (
    `${getIndent(depth + 1)}${key}: ${stringifyValue(val, depth + 1)}`
  ));

  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

// Общий обработчик для узлов
const formatNodeLine = (type, key, value, oldValue, depth) => {
  const indent = getIndent(depth, 2);
  switch (type) {
    case 'added':
      return `${indent}+ ${key}: ${stringifyValue(value, depth)}`;
    case 'removed':
      return `${indent}- ${key}: ${stringifyValue(value, depth)}`;
    case 'unchanged':
      return `${indent}  ${key}: ${stringifyValue(value, depth)}`;
    case 'updated':
      return [
        `${indent}- ${key}: ${stringifyValue(oldValue, depth)}`,
        `${indent}+ ${key}: ${stringifyValue(value, depth)}`
      ].join('\n');
    case 'nested':
      const childrenLines = iter(node.children, depth + 1);
      return `${getIndent(depth)}  ${key}: {\n${childrenLines}\n${getIndent(depth)}  }`;
    default:
      throw new Error(`Unknown node type: ${type}`);
  }
};

// Основная функция
const stylish = (diff) => {
  const iter = (nodes, depth = 1) => {
    return nodes.map(node => {
      const { type, key, value, oldValue, children } = node;

      if (type === 'nested') {
        const nestedLines = iter(children, depth + 1);
        return `${getIndent(depth)}  ${key}: {\n${nestedLines}\n${getIndent(depth)}  }`;
      }

      return formatNodeLine(type, key, value, oldValue, depth);
    }).join('\n');
  };

  return `{\n${iter(diff)}\n}`;
};

export default stylish;