const { apply, build, validate } = require('../../util');

const fixture = 'context/context';
const opts = { fixture };

let config;

describe('--context', () => {
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
