const updateNotifier = require('update-notifier');
// const webpack = require('webpack');

const weblog = require('webpack-log');
// const webpack = require('webpack');
// const WebpackWoofError = require('./lib/WebpackWoofError');

const pkg = require('../package.json');

const Command = require('./commands/Command');

module.exports = (config, cli) => {
  updateNotifier({ pkg }).notify();

  process.env.WEBPACK_WOOF = true;

  const { argv } = cli;
  const log = weblog({
    name: 'woof',
    id: 'webpack-woof',
    level: argv.logLevel || 'info',
    timestamp: argv.logTime,
  });

  // TODO: load entry from argv.input

  for (const sig of ['SIGINT', 'SIGTERM']) {
    process.on(sig, () => {
      // eslint-disable-line no-loop-func
      log.info(`Process Ended via ${sig}`);
      process.exit(0);
    });
  }
};

module.exports.Command = Command;
