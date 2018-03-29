'use strict';

const updateNotifier = require('update-notifier');
// const webpack = require('webpack');
const weblog = require('webpack-log');
// const WebpackWoofError = require('./lib/WebpackWoofError');
const pkg = require('./package.json');

module.exports = (options) => {
  updateNotifier({ pkg }).notify();

  process.env.WEBPACK_WOOF = true;

  const log = weblog({
    name: 'woof',
    id: 'webpack-woof',
    level: options.logLevel || 'info',
    timestamp: options.logTime
  });

  // TODO: load entry from argv.input

  for (const sig of ['SIGINT', 'SIGTERM']) {
    process.on(sig, () => { // eslint-disable-line no-loop-func
      log.info(`Process Ended via ${sig}`);
      process.exit(0);
    });
  }
};
