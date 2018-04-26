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

  // apply(compiler) {
  //   state.active += 1;
  //   state.instances += 1;

  render(error, stats) {
    const { compiler, state, rendered } = this;
    const { log } = console;
    const opts = {
      context: compiler.context,
      cached: false,
      cachedAssets: false,
      exclude: ['node_modules', 'bower_components', 'components'],
    };

    const json = stats.toJson(opts, true);

    // for --watch more than anything, don't print duplicate output for a hash
    // if we've already seen that hash. compensates for a bug in webpack.
    if (state.hashes.includes(json.hash)) {
      return;
    }

    state.active -= 1;
    state.hashes.push(json.hash);
    state.time += json.time;

    // errors and warnings go first, to make sure the counts are correct for modules
    const problems = style.problems(parse.problems(json, state));
    const files = style.files(parse.files(json), compiler.options);
    const hidden = style.hidden(parse.hidden(json));
    const hash = style.hash(json, files, hidden);

    const { version } = json;
    const out = [];

    if (!rendered.header) {
      rendered.header = true;
      out.push(chalk.cyan(`\nwebpack v${version}\n`));
    }

    out.push(hash);
    out.push(problems);

    // note: when --watch the active count will drop below zero.
    if (state.active <= 0) {
      const footer = style.footer(parse.footer(state));
      if (footer.length) {
        rendered.footer = true;
        out.push(footer);
      }

      // reset the totals
      state.totals = { errors: 0, time: 0, warnings: 0 };
    } else {
      rendered.footer = false;
    }

    const result = out.join('\n');

    log(result);

    if (rendered.footer && compiler.options.watch === true) {
      log();
    }

    // eslint-disable-next-line consistent-return
    return result;
  }
};
