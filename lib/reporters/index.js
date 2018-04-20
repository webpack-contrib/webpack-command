const Reporter = require('./Reporter');

module.exports = class BasicReporter extends Reporter {
  render(stats) {
    const { log } = console;
    log(stats.toString());
  }
};
