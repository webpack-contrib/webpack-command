const { apply, build, validate } = require('../../util');

const fixtures = [
  'output-chunk-filename',
  'output-filename',
  'output-jsonp-function',
  'output-library-target',
  'output-library',
  'output-path',
  'output-pathinfo',
  'output-public-path',
  'output-source-map-filename',
  'output',
];

describe('--output-*', () => {
  for (const name of fixtures) {
    const fixture = `output/${name}`;
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
        // expect(crcDist()).toMatchSnapshot();
      }));
  }
});
