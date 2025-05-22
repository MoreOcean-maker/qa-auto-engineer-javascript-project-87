const formatValue = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'object' && !Array.isArray(value)) return '[complex value]';
  return String(value);
};

const buildPropertyPath = (parentPath, key) => 
  parentPath ? `${parentPath}.${key}` : key;

const createDiffMessage = {
  added: (path, value) => `Property '${path}' was added with value: ${formatValue(value)}`,
  removed: (path) => `Property '${path}' was removed`,
  updated: (path, oldValue, value) => 
    `Property '${path}' was updated. From ${formatValue(oldValue)} to ${formatValue(value)}`,
  nested: (children, path, iter) => iter(children, path),
  unchanged: () => [],
};

const plain = (diff) => {
  const iter = (nodes, parentPath = '') => nodes
    .flatMap((node) => {
      const { key, type, value, oldValue, children } = node;
      const currentPath = buildPropertyPath(parentPath, key);

      if (!createDiffMessage[type]) {
        throw new Error(`Unknown node type: ${type}`);
      }

      return createDiffMessage[type](currentPath, value, oldValue, children, iter);
    })
    .join('\n');

  return iter(diff);
};

export default plain;
