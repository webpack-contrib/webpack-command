const strip = require('strip-ansi');

const parse = require('../../lib/reporters/parse');
const Reporter = require('../../lib/reporters/Reporter');
const { apply, build, test, validate } = require('../util');

test('reporter parse util', module, () => {
  it('should parse hidden', () => {
    const stats = {
      filteredAssets: 1,
      filteredModules: 2,
    };
    const result = parse.hidden(stats);

    expect(result).toMatchSnapshot();
  });

  it('should parse status: cacheable', () => {
    const result = parse.status({ cacheable: false });

    expect(result).toMatchSnapshot();
  });

  it('should parse status: optional', () => {
    const result = parse.status({ optional: true });

    expect(result).toMatchSnapshot();
  });

  it('should parse status: prefetched', () => {
    const result = parse.status({ prefetched: true });

    expect(result).toMatchSnapshot();
  });
});

test('Reporter', module, () => {
  it('should have methods', () => {
    expect(Reporter).toBeDefined();

    const reporter = new Reporter({ compiler: {}, config: {} });

    expect(reporter).toBeInstanceOf(Reporter);
    expect(reporter.compiler).toBeDefined();
    expect(reporter.config).toBeDefined();
    expect(reporter.progress).toBeDefined();
    expect(reporter.render).toBeDefined();

    expect(reporter.progress()).toBeUndefined();
    expect(reporter.render()).toBeUndefined();
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

    it(`${name}: reporter should validate`, () => {
      expect(validate(opts)).toEqual(true);
    });

    it(`${name}: reporter should apply`, () => {
      config = apply(opts);

      expect(config).toMatchSnapshot();
    });

    it(`${name}: reporter should build`, () =>
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

test('JsonReporter', module, () => {
  for (const name of ['json', 'json-multi', 'problems/problems']) {
    const fixture = `json/${name}`;
    const fixtureType = 'reporters';
    const opts = { fixture, fixtureType };

    let config;

    it(`${name}: reporter should validate`, () => {
      expect(validate(opts)).toEqual(true);
    });

    it(`${name}: reporter should apply`, () => {
      config = apply(opts);

      expect(config).toMatchSnapshot();
    });

    it(`${name}: reporter should build`, () =>
      build(config).then((result) => {
        expect(result.length).toBeGreaterThan(0);

        const json = JSON.parse(result);

        expect(Object.keys(json).length).toBeGreaterThan(0);

        if (name === 'problems/problems') {
          expect(json.errors.length).toBeGreaterThan(0);
          expect(json.warnings.length).toBeGreaterThan(0);
        }
      }));
  }
});

test('reporters + bail', module, () => {
  for (const name of ['Basic', 'Json', 'Stylish']) {
    it(`${name}: render should return error when bail set`, () => {
      const reporterPath = `../../lib/reporters/${name}Reporter`;
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const ReporterClass = require(reporterPath);
      const reporter = new ReporterClass({});
      const error = new Error('test');
      expect(reporter.render(error, null)).toMatchSnapshot();
    });
  }
});

test('bad reporter name', module, () => {
  const fixture = `json/json`;
  const fixtureType = 'reporters';
  const opts = { fixture, fixtureType };

  let config;

  it(`should apply`, () => {
    config = apply(opts);
    config.reporter = 'batman';
    expect(config).toMatchSnapshot();
  });

  it(`should default to stylish`, () =>
    build(config).then((result) => {
      expect(result.length).toBeGreaterThan(0);
      expect(
        strip(result)
          .replace(/Δt \d+ms/g, '<duration>')
          .replace(/\d+\.\d+ (KiB|kB)/g, '<size>')
          .replace(/[a-f0-9]{20}/g, '<hash>')
      ).toMatchSnapshot();
    }));
});
