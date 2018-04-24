/* eslint-disable global-require */

const { register } = require('../lib/global');

register();

global.expect = require('expect');

require('./snapshot');

describe('Flags', () => {
  require('./tests/flags/bail');
  require('./tests/flags/config');
});
