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

require('./tests/commands/help');
require('./tests/commands/teach');

require('./tests/cli');
require('./tests/config');
require('./tests/flags');
require('./tests/reporters');

const flags = [
  'bail',
  'cache',
  'config',
  'config-name',
  'context',
  'debug',
  'define',
  'devtool',
  'entry',
  'hot',
  'mode',
  'module-bind',
  'optimize',
  'output',
  'plugin',
  'prefetch',
  'profile',
  'provide',
  'records',
  'reporter',
  'resolve',
  'run-mode',
  'target',
  'watch',
];

describe('Flags', () => {
  for (const test of flags) {
    require(`./tests/flags/${test}`);
  }
});
