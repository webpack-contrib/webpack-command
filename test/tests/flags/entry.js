const { apply, build, crcDist, prep, test, validate } = require('../../util');
const parseEntries = require('../../../lib/entry');

test('--entry', module, () => {
  // it('should parse input', () => {
  //   const entries = [
  //     fixturePath('common/entry-a.js'),
  //     fixturePath('common/entry-c.js'),
  //   ];
  //   const result = parseEntries({ entries, flags: {} });
  //
  //   expect(result.main).toHaveLength(2);
  //   expect(result).toMatchSnapshot();
  // });
  //
  // it('should parse single flag', () => {
  //   const flags = { entry: fixturePath('common/entry-a.js') };
  //   const result = parseEntries({ entries: [], flags });
  //
  //   expect(result.main).toEqual(flags.entry);
  //   expect(result).toMatchSnapshot();
  // });
  //
  // it('should parse flag array', () => {
  //   const flags = {
  //     entry: [
  //       fixturePath('common/entry-a.js'),
  //       fixturePath('common/entry-b.js'),
  //     ],
  //   };
  //   const result = parseEntries({ entries: [], flags });
  //
  //   expect(result.main).toHaveLength(2);
  //   expect(result).toMatchSnapshot();
  // });
  //
  // it('should parse flag object', () => {
  //   const flags = {
  //     entry: {
  //       a: fixturePath('common/entry-a.js'),
  //       b: fixturePath('common/entry-b.js'),
  //     },
  //   };
  //   const result = parseEntries({ entries: [], flags });
  //
  //   expect(Object.keys(result)).toHaveLength(2);
  //   expect(result).toMatchSnapshot();
  // });
  //
  // it('should parse input + single flag', () => {
  //   const entries = [fixturePath('common/entry-a.js')];
  //   const flags = { entry: fixturePath('common/entry-b.js') };
  //   const result = parseEntries({ entries, flags });
  //
  //   expect(result.main).toHaveLength(2);
  //   expect(result).toMatchSnapshot();
  // });
  //
  // it('should parse input + flag array', () => {
  //   const entries = [fixturePath('common/entry-a.js')];
  //   const flags = {
  //     entry: [
  //       fixturePath('common/entry-b.js'),
  //       fixturePath('common/entry-c.js'),
  //     ],
  //   };
  //   const result = parseEntries({ entries, flags });
  //
  //   expect(result.main).toHaveLength(3);
  //   expect(result).toMatchSnapshot();
  // });
  //
  // it('should parse input + flag object', () => {
  //   const entries = [fixturePath('common/entry-a.js')];
  //   const flags = {
  //     entry: {
  //       a: fixturePath('common/entry-a.js'),
  //       b: fixturePath('common/entry-b.js'),
  //     },
  //   };
  //   const result = parseEntries({ entries, flags });
  //
  //   expect(typeof result.main).toBe('string');
  //   expect(Object.keys(result)).toHaveLength(3);
  //   expect(result).toMatchSnapshot();
  // });

  for (const name of ['multi' /* , 'single'*/]) {
    const fixture = `entry/${name}`;
    const opts = { fixture };
    let config;

    it(`${name} should validate`, () => {
      expect(validate(opts)).toEqual(true);
    });

    it(`${name} should apply`, () => {
      const { argv } = prep(opts);
      const entry = parseEntries({ entries: [], flags: argv });

      config = apply(opts);

      if (entry) {
        config.entry = entry;
      }

      expect(config).toMatchSnapshot();
    });

    it(`${name} should build`, () =>
      build(config).then((result) => {
        expect(result).toMatchSnapshot();
        expect(crcDist()).toMatchSnapshot();
      }));
  }
});
