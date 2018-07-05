const { test } = require('../util');
const flags = require('../../lib/flags');
const { loadPlugin, validateFlags } = require('../../lib/flags/util');

const config = require('../fixtures/common/webpack.config.js');

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

  it('should parse compound flags: --run-dev', () => {
    const result = flags.apply({ runDev: true }, config);
    expect(result).toMatchSnapshot();
  });

  it('should parse compound flags: --run-prod', () => {
    const result = flags.apply({ runProd: true }, config);
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

  it('should load a plugin', () => {
    expect(loadPlugin('uglifyjs-webpack-plugin')).toMatchSnapshot();
  });

  it('should load a plugin with querystring', () => {
    expect(loadPlugin('uglifyjs-webpack-plugin?cache=true')).toMatchSnapshot();
  });

  it('should fail to load a plugin with bad querystring', () => {
    const fn = () => loadPlugin('uglifyjs-webpack-plugin?...');
    expect(fn).toThrowErrorMatchingSnapshot();
  });

  it('should fail to load a plugin with bad options', () => {
    const fn = () => loadPlugin('uglifyjs-webpack-plugin?true');
    expect(fn).toThrowErrorMatchingSnapshot();
  });
});
