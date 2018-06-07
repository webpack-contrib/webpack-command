const { test } = require('../util');
const flags = require('../../lib/flags');
const { validateFlags } = require('../../lib/flags/util');

test('lib/flags', module, () => {
  it(`should display help`, () => {
    const result = flags.help();
    expect(result).toMatchSnapshot();
  });

  it(`should return minimist opts`, () => {
    const result = flags.opts();
    expect(result).toMatchSnapshot();
  });

  it('should parse flags cleanly', () => {
    const result = flags.apply({}, {});
    expect(result).toMatchSnapshot();
  });
});

test('lib/flags/util', module, () => {
  const allFlags = flags.getFlags();
  const options = { stdout: false };

  it(`should validate flags`, () => {
    const argv = { debug: true, watch: true };
    const result = validateFlags(allFlags, argv, options);
    expect(result).toBe(true);
  });

  it(`should not allow invalid value types`, () => {
    const argv = { debug: 'yes' };
    try {
      validateFlags(allFlags, argv, options);
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });

  it(`should suggest alternatives`, () => {
    const argv = { debg: true, wath: true };
    try {
      validateFlags(allFlags, argv, options);
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
