const Reporter = require('./Reporter');

module.exports = class BasicReporter extends Reporter {
  render(error, stats) {
    const { log } = console;
    const compilers = this.compiler.compilers || [this.compiler];

    const targetCompiler = compilers.find((comp) => !!comp.options.stats);
    const { options } = targetCompiler || { options: {} };
    const result = stats.toString(options.stats);

    log(result);

    return result;
  }
};
