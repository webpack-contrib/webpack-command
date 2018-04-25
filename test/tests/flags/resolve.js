const { apply, build, crcDist, validate } = require('../../util');

describe('--resolve-*', () => {
  for (const name of [
    'resolve-alias',
    'resolve-extensions',
    'resolve-loader-alias',
  ]) {
    const fixture = `resolve/${name}`;
    const opts = { fixture };

    let config;

    it(`${name} reporter should validate`, () => {
      expect(validate(opts)).toEqual(true);
    });

    it(`${name} reporter should apply`, () => {
      config = apply(opts);

      expect(config).toMatchSnapshot();
    });

    it(`${name} reporter should build`, () =>
      build(config).then((result) => {
        expect(result).toMatchSnapshot();
        expect(crcDist()).toMatchSnapshot();
      }));
  }
});
