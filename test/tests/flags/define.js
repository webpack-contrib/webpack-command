const { apply, build, distContains, test, validate } = require('../../util');

const fixture = 'define/define';
const opts = { fixture };

let config;

test('--define', module, () => {
  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });

  it(`should build`, () =>
    build(config).then((result) => {
      expect(distContains(`result: 'valid'`)).toBe(true);
      expect(result).toMatchSnapshot();
    }));
});
