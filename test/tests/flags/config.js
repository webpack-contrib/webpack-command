const cli = require('../../../lib');
const { prep, test, validate } = require('../../util');

const fixture = 'config/config';
const opts = { fixture };

test('--config', module, () => {
  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should build`, () => {
    const { argv } = prep({ fixture });

    return cli({ argv, entries: [], flags: argv }).then((result) => {
      expect(result).toMatchSnapshot();
    });
  });
});
