const merge = require('merge-options');
const updateNotifier = require('update-notifier');
const weblog = require('webpack-log');
const loader = require('@webpack-contrib/config-loader');

const pkg = require('../package.json');

const Command = require('./commands/Command');
const compiler = require('./compiler');
const { apply } = require('./flags');
const WebpackWoofError = require('./WebpackWoofError');

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
  const loaderOptions = {
    configPath: argv.config,
    require: argv.require,
  };
  const options = {};

  if (!apply(argv, options)) {
    process.exit(1);
  }

  loader(loaderOptions).then(({ config }) => {
    let target;

    if (Array.isArray(config)) {
      target = config.map((conf) => merge(conf, options));
    } else {
      target = merge(config, options);
    }

    if (argv.configName) {
      if (Array.isArray(config)) {
        const index = config.find((conf) => conf.name === argv.configName);

        if (index < 0) {
          throw new WebpackWoofError(
            `The --config-name specified was not found`
          );
        }

        target = config[index];
      } else {
        throw new WebpackWoofError(
          '--config-name was used but the specified configuration is not an Array'
        );
      }
    }

    compiler(target).run();
  });

  for (const sig of ['SIGINT', 'SIGTERM']) {
    process.on(sig, () => {
      // eslint-disable-line no-loop-func
      log.info(`Process Ended via ${sig}`);
      process.exit(0);
    });
  }
};

module.exports.Command = Command;
