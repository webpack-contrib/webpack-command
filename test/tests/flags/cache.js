const { apply, build, test, validate } = require('../../util');

const fixture = 'cache/cache';
const opts = { fixture };

let config;

test('--cache', module, () => {
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
