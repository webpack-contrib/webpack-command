const { apply, build, crcDist, validate } = require('../../util');

const fixture = 'prefetch/prefetch';
const opts = { fixture };

let config;

describe('--prefetch', () => {
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
      expect(crcDist()).toMatchSnapshot();
    }));
});
