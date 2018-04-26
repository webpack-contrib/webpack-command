const strip = require('strip-ansi');

const { apply, build, crcDist, test, validate } = require('../../util');

// TODO: test stylish reporter
test('--reporter', module, () => {
  for (const name of ['basic', 'stylish']) {
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
        expect(
          strip(result).replace(/Δt \d+ms/, '<duration>')
        ).toMatchSnapshot();
        expect(crcDist()).toMatchSnapshot();
      }));
  }
});
