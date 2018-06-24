const weblog = require('webpack-log');

const WebpackCommandError = require('../WebpackCommandError');

const Reporter = require('./Reporter');

module.exports = class JsonReporter extends Reporter {
  constructor(...args) {
    super(...args);

    const log = weblog({ name: 'webpack', id: 'webpack-command' });
    this.originalLevel = log.level;
    log.level = 'silent';
    this.log = log;
  }

  /* istanbul ignore next */
  progress() {
    throw new WebpackCommandError(
      'Build progress display is not supported when using the JSON reporter'
    );
  }

  render(error, stats) {
    const json = stats.toJson();
    const result = JSON.stringify(json, null, 2);

    process.stdout.write(result);

    this.log.level = this.originalLevel;

    return result;
  }
};
