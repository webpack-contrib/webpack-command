const merge = require('merge-options');
const ModuleNotFoundError = require('webpack/lib/ModuleNotFoundError');

const { apply, run, validate } = require('../../util');

const fixture = 'bail/bail';
const group = 'advanced';
const opts = { fixture, group };

let config;

describe('--bail', () => {
  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    const result = apply(opts);

    // do this until https://github.com/tribou/jest-serializer-path/issues/23
    // is resolved
    const test = merge({}, result);

    expect(test).toMatchSnapshot();

    config = merge({ reporter: 'test' }, result);
  });

  it(`should build, fail, and bail`, () =>
    run(config).catch((error) => {
      expect(error).toEqual(expect.any(ModuleNotFoundError));
    }));
});
