const Reporter = require('./Reporter');

module.exports = class BasicReporter extends Reporter {
  render(error, stats) {
    const { log } = console;
    log(stats.toString());
  }
};
