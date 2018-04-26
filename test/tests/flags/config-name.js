const { distill } = require('../../../lib/config');
const { prep, test, validate } = require('../../util');

const fixtures = [
  'multi-duplicate',
  'multi-found',
  'multi-missing',
  'single-array',
  'single-object',
];

test('--config-name', module, () => {
  for (const name of fixtures) {
    const opts = {
      fixture: `config-name/${name}`,
    };
    const { argv, fixture } = prep(opts);

    it(`${name} should validate`, () => {
      expect(validate(opts)).toEqual(true);
    });

    // eslint-disable-next-line arrow-body-style
    it(`${name} should ${fixture.throws ? 'throw' : 'find config'}`, () => {
      const stub = () => distill(argv, fixture.config, {});

      if (fixture.throws) {
        expect(stub).toThrow(fixture.throws);
      } else {
        expect(stub()).toMatchSnapshot();
      }
    });
  }
});
