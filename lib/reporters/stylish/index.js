const chalk = require('chalk');

const parse = require('../parse');
const Reporter = require('../Reporter');

const style = require('./style');

module.exports = class StylishReporter extends Reporter {
  constructor(compiler) {
    super(compiler);

    this.rendered = {
      footer: false,
      header: false,
    };

    this.state = {
      active: 0,
      hashes: [],
      instances: 0,
      totals: {
        errors: 0,
        time: 0,
        warnings: 0,
      },
      time: 0,
    };
  }

  render(error, resultStats) {
    // handles both Stats and MultiStats
    const allStats = resultStats.stats || [resultStats];
    const compilers = this.compiler.compilers || [this.compiler];
    const { log } = console;
    const { compiler, state, rendered } = this;
    const opts = {
      context: compiler.context,
      cached: false,
      cachedAssets: false,
      exclude: ['node_modules', 'bower_components', 'components'],
    };
    const out = [];
    const first = allStats[0].toJson(opts, true);
    const { version } = first;

    out.push(chalk.cyan(`\nwebpack v${version}\n`));

    state.instances = allStats.length;

    for (const stats of allStats) {
      const json = stats.toJson(opts, true);

      // for --watch more than anything, don't print duplicate output for a hash
      // if we've already seen that hash. compensates for a bug in webpack.
      if (state.hashes.includes(json.hash)) {
        return;
      }

      state.hashes.push(json.hash);
      state.time += json.time;

      // errors and warnings go first, to make sure the counts are correct for modules
      const compilerIndex = allStats.indexOf(stats);
      const compilerOptions = compilers[compilerIndex].options;
      const problems = style.problems(parse.problems(json, state));
      const files = style.files(parse.files(json), compilerOptions);
      const hidden = style.hidden(parse.hidden(json));
      const hash = style.hash(json, files, hidden);

      out.push(hash);
      out.push(problems);
    }

    const footer = style.footer(parse.footer(state));

    if (footer.length) {
      rendered.footer = true;
      out.push(footer);
    }

    state.totals = { errors: 0, time: 0, warnings: 0 };

    const result = out.join('\n');

    log(result);

    if (
      rendered.footer &&
      compilers.some((comp) => comp.options.watch === true)
    ) {
      log();
    }

    // eslint-disable-next-line consistent-return
    return result;
  }
};
