/* eslint-disable global-require */

const { register } = require('../lib/global');

register();

global.expect = require('expect');

require('./snapshot');

describe('Flags', () => {
  require('./tests/flags/bail');
  require('./tests/flags/config');
  // TODO: something is up with the name thing, it's naming every config before and
  // after this test 'single-object' and I need to track it down.
  // require('./tests/flags/config-name');
  require('./tests/flags/context');
  require('./tests/flags/debug');
  require('./tests/flags/define');
  require('./tests/flags/devtool');
});
