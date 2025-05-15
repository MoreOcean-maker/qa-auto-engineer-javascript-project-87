import plain from '../src/formatters/plain.js'

test('plain format test', () => {
  const diff = [
    { type: 'removed', key: 'follow', value: undefined },
    { type: 'removed', key: 'proxy', value: '123.234.53.22' },
    {
      type: 'updated',
      key: 'timeout',
      oldValue: 50,
      value: 20
    },
    { type: 'added', key: 'verbose', value: true }
  ]

  const result = plain(diff)

  expect(result).toEqual(
    "Property 'follow' was removed\n"
    + "Property 'proxy' was removed\n"
    + "Property 'timeout' was updated. From 50 to 20\n"
    + "Property 'verbose' was added with value: true"
  )
})
