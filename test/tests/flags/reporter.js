const { apply, build, crcDist, validate } = require('../../util');

describe('--reporter', () => {
  for (const name of ['basic']) {
    const fixture = `reporter/${name}`;
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
