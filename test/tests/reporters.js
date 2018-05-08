const strip = require('strip-ansi');

const Reporter = require('../../lib/reporters/Reporter');
const { apply, build, test, validate } = require('../util');

test('Reporter', module, () => {
  it('should have methods', () => {
    expect(Reporter).toBeDefined();

    const reporter = new Reporter({ compiler: {}, config: {} });

    expect(reporter.compiler).toBeDefined();
    expect(reporter.config).toBeDefined();
    expect(reporter.progress).toBeDefined();
    expect(reporter.render).toBeDefined();
  });
});

test('StylishReporter', module, () => {
  for (const name of [
    'stylish',
    'stylish-multi',
    'problems/stylish-problems',
  ]) {
    const fixture = `stylish/${name}`;
    const fixtureType = 'reporters';
    const opts = { fixture, fixtureType };

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
          strip(result)
            .replace(/Δt \d+ms/g, '<duration>')
            .replace(/\d+\.\d+ (KiB|kB)/g, '<size>')
            .replace(/[a-f0-9]{20}/g, '<hash>')
        ).toMatchSnapshot();
      }));
  }
});
