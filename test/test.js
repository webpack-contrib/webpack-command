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

require('./tests/config');
require('./tests/flags');

const flags = [
  'bail',
  'cache',
  'config',

  // TODO: something is up with the name thing, it's naming every config before and
  // after this test 'single-object' and I need to track it down.
  // 'config-name',

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
