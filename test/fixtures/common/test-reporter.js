const Reporter = require('../../../lib/reporters/Reporter');
const WebpackCommandError = require('../../../lib/WebpackCommandError');

module.exports = class TestReporter extends Reporter {
  render(error, stats) {
    if (!stats) {
      return null;
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      throw new WebpackCommandError(info.errors);
    }

    const result = stats.toString({
      builtAt: false,
      hash: false,
      timings: false,
    });

    return result;
  }
};
