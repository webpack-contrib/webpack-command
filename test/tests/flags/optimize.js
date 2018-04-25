const { apply, build, crcDist, validate } = require('../../util');

describe('--optimize-*', () => {
  for (const name of ['max-chunks', 'min-chunk-size', 'minimize']) {
    const fixture = `optimize/optimize-${name}`;
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
