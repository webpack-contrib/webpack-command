const updateNotifier = require('update-notifier');
const weblog = require('webpack-log');

const pkg = require('../package.json');

const Command = require('./commands/Command');
const compiler = require('./compiler');
const { load } = require('./config');
const parseEntries = require('./entry');
const { apply } = require('./flags');

module.exports = (cli) => {
  updateNotifier({ pkg }).notify();

  process.env.WEBPACK_COMMAND = '1';

  const { argv } = cli;
  const log = weblog({
    name: 'webpack',
    id: 'webpack-command',
    level: argv.logLevel || 'info',
    timestamp: argv.logTime,
  });

  const options = apply(argv, {});
  const entry = parseEntries(cli);

  if (entry) {
    options.entry = entry;
  }

  if (!options) {
    process.exit(1);
  }

  /* istanbul ignore next */
  /** @type {NodeJS.Signals[]} */
  const signals = ['SIGINT', 'SIGTERM'];
  for (const sig of signals) {
    process.on(sig, () => {
      // eslint-disable-line no-loop-func
      log.info(`Process Ended via ${sig}`);
      process.exit(0);
    });
  }

  return load(argv, options).then((target) => compiler(target).run());
};

module.exports.Command = Command;
