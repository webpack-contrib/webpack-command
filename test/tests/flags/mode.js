const { apply, build, crcDist, validate } = require('../../util');

describe('--debug', () => {
  for (const name of ['dev', 'prod']) {
    const fixture = `mode/${name}`;
    const opts = { fixture };

    let config;

    it(`${name} should validate`, () => {
      expect(validate(opts)).toEqual(true);
    });

    it(`${name} should apply`, () => {
      config = apply(opts);

      expect(config).toMatchSnapshot();
    });

    it(`${name} should build`, () =>
      build(config).then((result) => {
        expect(result).toMatchSnapshot();
        expect(crcDist()).toMatchSnapshot();
      }));
  }
});
