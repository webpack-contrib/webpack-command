const Reporter = require('../../../lib/reporters/Reporter');
const WebpackWoofError = require('../../../lib/WebpackWoofError');

module.exports = class TestReporter extends Reporter {
  render(error, stats) {
    if (stats.hasErrors()) {
      const info = stats.toJson();
      throw new WebpackWoofError(info.errors);
    }

    const result = stats.toString({
      builtAt: false,
      hash: false,
      timings: false,
    });

    return result;
  }
};
