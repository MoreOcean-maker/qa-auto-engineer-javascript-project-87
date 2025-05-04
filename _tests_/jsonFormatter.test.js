import jsonFormatter from '../formatters/json.js';

describe('json formatter', () => {
  test('correctly formats diff to JSON', () => {
    const diff = [
      {
        key: 'timeout',
        type: 'updated',
        oldValue: 50,
        value: 20,
      },
      {
        key: 'verbose',
        type: 'added',
        value: true,
      },
    ];

    const result = jsonFormatter(diff);
    expect(() => JSON.parse(result)).not.toThrow();
    expect(result).toMatchSnapshot();
  });
});
