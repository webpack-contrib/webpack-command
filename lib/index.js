const updateNotifier = require('update-notifier');
// const webpack = require('webpack');

const weblog = require('webpack-log');
// const WebpackWoofError = require('./lib/WebpackWoofError');
const loader = require('@webpack-contrib/config-loader');

const pkg = require('../package.json');

const Command = require('./commands/Command');
const { apply } = require('./flags');

module.exports = (cli) => {
  updateNotifier({ pkg }).notify();

  process.env.WEBPACK_WOOF = true;

  const { argv } = cli;
  const log = weblog({
    name: 'woof',
    id: 'webpack-woof',
    level: argv.logLevel || 'info',
    timestamp: argv.logTime,
  });
  let options = {}; // eslint-disable-line prefer-const

  if (apply(argv, options)) {
    const loaderOptions = {
      configPath: argv.configPath,
      require: argv.require,
    };

    loader(loaderOptions).then(({ config }) => {
      // TODO: webpack(options);
      console.log(config);
    });
  }

  for (const sig of ['SIGINT', 'SIGTERM']) {
    process.on(sig, () => {
      // eslint-disable-line no-loop-func
      log.info(`Process Ended via ${sig}`);
      process.exit(0);
    });
  }
};

module.exports.Command = Command;
