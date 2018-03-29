#!/usr/bin/env node

'use strict';

if (!module.parent) {
  // eslint-disable-next-line global-require
  const { register } = require('./lib/global');

  register();
}

const debug = require('debug')('webpack-woof');
const importLocal = require('import-local'); // eslint-disable-line import/order

// Prefer the local installation of webpack-serve
/* istanbul ignore if */
if (importLocal(__filename)) {
  debug('Using local install of webpack-serve');
  return;
}

const chalk = require('chalk');
const cosmiconfig = require('cosmiconfig');
const meow = require('meow');
const merge = require('lodash/merge');
const { help } = require('./lib/flags');
const woof = require('./');

const cli = meow(chalk`
{underline Usage}
  $ webpack [<config>, ...options]
  $ webpack <entry-file> [...<entry-file>] <output-file>

{underline Options}
${help()}

  For further documentation, visit https://webpack.js.org/api/cli

{underline Examples}
  $ webpack
  $ webpack
  $ webpack
`);

// TODO: load config using 'interpret' module

const flags = Object.assign({}, cli.flags);
const cosmicOptions = {
  rcExtensions: true,
  sync: true
};
const explorer = cosmiconfig('webpack', cosmicOptions);
const { config } = explorer.load() || {};
const options = merge({ flags }, config);

if (flags.help) {
  cli.showHelp(0);
}

woof(options);
