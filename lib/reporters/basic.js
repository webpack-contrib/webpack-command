const Reporter = require('./Reporter');

module.exports = class BasicReporter extends Reporter {
  render(error, stats) {
    const { log } = console;
    const { options } = this.compiler;
    const result = stats.toString(options.stats);

    log(result);

    return result;
  }
};
