/* eslint-disable global-require, import/no-dynamic-require */
// TODO: move the output from /dist to test/dist and update .gitignore

const { join, resolve } = require('path');

const { register } = require('../lib/global');

register();

global.expect = require('expect');

global.resolve = resolve;
global.fixture = (path) => require(resolve(__dirname, './fixtures', path));
global.fixturePath = (path) => join(__dirname, './fixtures', path);

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
  require('./tests/flags/entry');
  require('./tests/flags/mode');
});
