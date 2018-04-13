module.exports = {
  name: 'General',

  // TODO:
  // --help              Show usage information and the options listed here.
  // --version           Display the webpack-serve version
  // --log-level         Limit all process console messages to a specific level and above
  //                     {dim Levels: trace, debug, info, warn, error, silent}
  // --log-time          Instruct the logger for webpack-serve and dependencies to display a timestamp

  // ifBooleanArg("debug", function() {
  //   const LoaderOptionsPlugin = require("webpack").LoaderOptionsPlugin;
  //   addPlugin(
  //     options,
  //     new LoaderOptionsPlugin({
  //       debug: true
  //     })
  //   );
  // });

  // ifArg("devtool", function(value) {
  //   options.devtool = value;
  // });

  // ifArgPair(
  //   "entry",
  //   function(name, entry) {
  //     if (
  //       typeof options.entry[name] !== "undefined" &&
  //       options.entry[name] !== null
  //     ) {
  //       options.entry[name] = [].concat(options.entry[name]).concat(entry);
  //     } else {
  //       options.entry[name] = entry;
  //     }
  //   },
  //   function() {
  //     ensureObject(options, "entry");
  //   }
  // );

  //   if (argv.context) {
  //   options.context = path.resolve(argv.context);
  // }
  // if (!options.context) {
  //   options.context = process.cwd();
  // }
  //
  // if (argv.watch) {
  //   options.watch = true;
  // }

  // if (argv.d) {
  //   argv.debug = true;
  //   argv["output-pathinfo"] = true;
  //   if (!argv.devtool) {
  //     argv.devtool = "eval-cheap-module-source-map";
  //   }
  //   if (!argv.mode) {
  //     argv.mode = "development";
  //   }
  // }
  // if (argv.p) {
  //   argv["optimize-minimize"] = true;
  //   argv["define"] = []
  //   .concat(argv["define"] || [])
  //   .concat("process.env.NODE_ENV=\"production\"");
  //   if (!argv.mode) {
  //     argv.mode = "production";
  //   }
  // }

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
      desc:
        'Enable devtool for better debugging experience (Example: --devtool eval-cheap-module-source-map)',
      type: 'string',
    },
    entry: {
      desc: 'The entry point',
      type: 'string',
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
    watch: {
      alias: 'w',
      desc: 'Watch the filesystem for changes',
      type: 'boolean',
    },
  },
};
