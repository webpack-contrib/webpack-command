const { apply, build, test, validate } = require('../../util');

test('--optimize-*', module, () => {
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
        expect(result.replace(/\d+\.\d+ KiB/, '<size>')).toMatchSnapshot();
      }));
  }
});
