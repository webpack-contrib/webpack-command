const path = require('path');

const chalk = require('chalk');
const merge = require('merge-options');
const webpack = require('webpack');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  apply(argv, options) {
    const result = { plugins: [] };

    if (argv.context) {
      result.context = path.resolve(argv.context);
    } else {
      result.context = process.cwd();
    }

    // NOTE: runDev and runProd should be examined FIRST, as they maniuplate
    //       the argv object.
    /* eslint-disable no-param-reassign */
    // TODO: maniuplating argv is bad and should make us feel bad. replace this
    //       hold-over from webpack-cli with something better.
    if (argv.runDev) {
      argv.debug = true;
      argv['output-pathinfo'] = true;
      if (!argv.devtool) {
        argv.devtool = 'eval-cheap-module-source-map';
      }
      if (!argv.mode) {
        argv.mode = 'development';
      }
    }

    if (argv.runProd) {
      argv['optimize-minimize'] = true;
      argv.define = []
        .concat(argv.define || [])
        .concat('process.env.NODE_ENV="production"');
      if (!argv.mode) {
        argv.mode = 'production';
      }
    }
    /* eslint-enable no-param-reassign */

    if (argv.debug) {
      const { LoaderOptionsPlugin } = webpack;
      const plugin = new LoaderOptionsPlugin({ debug: true });
      result.plugins.unshift(plugin);
    }

    if (argv.devtool) {
      result.devtool = argv.devtool;
    }

    if (argv.watch) {
      result.watch = true;
    }

    // eslint-disable-next-line no-param-reassign
    options = merge(result, options);
  },

  flags: {
    context: {
      desc: 'The root directory for resolving entry point and stats',
      type: 'string',
    },
    debug: {
      desc: 'Switch loaders to debug mode',
      type: 'boolean',
    },
    devtool: {
      desc: chalk`Enable devtool for better debugging experience.
{dim e.g. --devtool eval-cheap-module-source-map}`,
      type: 'string',
    },
    entry: {
      desc: 'The entry point',
      type: 'string',
    },
    help: {
      desc: 'Show usage information and the options listed here',
    },
    'log-level': {
      desc: chalk`Limit all process console messages to a specific level and above
{dim Levels: trace, debug, info, warn, error, silent}`,
      type: 'string',
    },
    'log-time': {
      desc:
        'Instruct the logger for webpack-serve and dependencies to display a timestamp',
    },
    'run-dev': {
      alias: 'd',
      desc:
        'shortcut for --debug --devtool eval-cheap-module-source-map --output-pathinfo',
      type: 'boolean',
    },
    'run-prod': {
      alias: 'p',
      desc:
        'shortcut for --optimize-minimize --define process.env.NODE_ENV="production"',
      type: 'boolean',
    },
    version: {
      desc: 'Display the webpack-woof version',
    },
    watch: {
      alias: 'w',
      desc: 'Watch the filesystem for changes',
      type: 'boolean',
    },
  },

  name: 'General',
};
