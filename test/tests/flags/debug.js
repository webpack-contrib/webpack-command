const { apply, build, validate } = require('../../util');

const fixture = 'debug/debug';
const opts = { fixture };

let config;

describe('--debug', () => {
  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });

  it(`should build`, () =>
    build(config).then((result) => {
      expect(result).toMatchSnapshot();
    }));
});
