const strip = require('strip-ansi');

const { apply, build, crcDist, test, validate } = require('../../util');

test('--reporter', module, () => {
  for (const name of ['basic', 'basic-multi', 'stylish', 'stylish-multi']) {
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
          strip(result).replace(/Δt \d+ms/g, '<duration>')
        ).toMatchSnapshot();
        expect(crcDist()).toMatchSnapshot();
      }));
  }
});
