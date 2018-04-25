const { apply, build, crcDist, distContains, validate } = require('../../util');

describe('--records-*', () => {
  for (const name of ['input-output', 'path']) {
    const fixture = `records/records-${name}`;
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
      build(config).then(() => {
        expect(distContains(/factory:\dms building:\dms = \dms/));
        expect(crcDist()).toMatchSnapshot();
      }));
  }
});
