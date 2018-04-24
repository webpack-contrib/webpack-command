const cli = require('../../../lib');
const { prep, validate } = require('../../util');

const fixture = 'config/config';
const opts = { fixture };

describe('--config', () => {
  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should build`, () => {
    const { argv } = prep({ fixture });

    return cli({ argv }).then((result) => {
      expect(result).toMatchSnapshot();
    });
  });
});
