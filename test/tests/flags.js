const { test } = require('../util');
const flags = require('../../lib/flags');

test('lib/flags', module, () => {
  it(`should display help`, () => {
    const result = flags.help();
    expect(result).toMatchSnapshot();
  });

  it(`should return minimist opts`, () => {
    const result = flags.opts();
    expect(result).toMatchSnapshot();
  });
});
