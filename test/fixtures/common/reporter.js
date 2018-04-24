const Reporter = require('../../../lib/reporters/Reporter');
const WebpackWoofError = require('../../../lib/WebpackWoofError');

module.exports = class TestReporter extends Reporter {
  render(stats) {
    const { log } = console;

    if (stats.hasErrors()) {
      const info = stats.toJson();
      throw new WebpackWoofError(info.errors);
    }

    log(stats.toString());
  }
};
