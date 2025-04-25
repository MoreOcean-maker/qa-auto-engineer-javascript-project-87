export default {
  transform: {},
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  transformIgnorePatterns: [
    '/node_modules/(?!your-esm-package-to-transform)',
  ],
};
