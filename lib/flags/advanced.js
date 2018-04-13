// ifArg("records-input-path", function(value) {
//   options.recordsInputPath = path.resolve(value);
// });
//
// ifArg("records-output-path", function(value) {
//   options.recordsOutputPath = path.resolve(value);
// });
//
// ifArg("records-path", function(value) {
//   options.recordsPath = path.resolve(value);
// });
//
// ifArg("target", function(value) {
//   options.target = value;
// });
//
// ifBooleanArg("hot", function() {
//   const HotModuleReplacementPlugin = require("webpack")
//     .HotModuleReplacementPlugin;
//   addPlugin(options, new HotModuleReplacementPlugin());
// });
//
// mapArgToBoolean("cache");
//
// mapArgToBoolean("bail");
//
// mapArgToBoolean("profile");
//
// ifArg("plugin", function(value) {
//   addPlugin(options, loadPlugin(value));
// });
//
// ifArg("prefetch", function(request) {
//   const PrefetchPlugin = require("webpack").PrefetchPlugin;
//   addPlugin(options, new PrefetchPlugin(request));
// });
//
// ifArg("provide", function(value) {
//   const idx = value.indexOf("=");
//   let name;
//   if (idx >= 0) {
//     name = value.substr(0, idx);
//     value = value.substr(idx + 1);
//   } else {
//     name = value;
//   }
//   const ProvidePlugin = require("webpack").ProvidePlugin;
//   addPlugin(options, new ProvidePlugin(name, value));
// });

// let defineObject;
// ifArgPair(
//   "define",
//   function(name, value) {
//     if (name === null) {
//       name = value;
//       value = true;
//     }
//     defineObject[name] = value;
//   },
//   function() {
//     defineObject = {};
//   },
//   function() {
//     const DefinePlugin = require("webpack").DefinePlugin;
//     addPlugin(options, new DefinePlugin(defineObject));
//   }
// );

// if (argv["watch-aggregate-timeout"]) {
//   options.watchOptions = options.watchOptions || {};
//   options.watchOptions.aggregateTimeout = +argv["watch-aggregate-timeout"];
// }
//
// if (typeof argv["watch-poll"] !== "undefined") {
//   options.watchOptions = options.watchOptions || {};
//   if (argv["watch-poll"] === "true" || argv["watch-poll"] === "")
//     options.watchOptions.poll = true;
//   else if (!isNaN(argv["watch-poll"]))
//     options.watchOptions.poll = +argv["watch-poll"];
// }
//
// if (argv["watch-stdin"]) {
//   options.watchOptions = options.watchOptions || {};
//   options.watchOptions.stdin = true;
//   options.watch = true;
// }

module.exports = {
  name: 'Advanced',
  flags: {
    bail: {
      type: 'boolean',
      desc: 'Abort the compilation on first error',
    },
    cache: {
      type: 'boolean',
      desc: 'Enable in memory caching',
    },
    define: {
      type: 'string',
      desc: 'Define any free var in the bundle',
    },
    hot: {
      type: 'boolean',
      desc: 'Enables Hot Module Replacement',
    },
    'labeled-modules': {
      type: 'boolean',
      desc: 'Enables labeled modules',
    },
    plugin: {
      type: 'string',
      desc: 'Load this plugin',
    },
    prefetch: {
      desc: 'Prefetch this request (Example: --prefetch ./file.js)',
      type: 'string',
    },
    profile: {
      desc: 'Profile the compilation and include information in stats',
      type: 'boolean',
    },
    provide: {
      desc:
        'Provide these modules as free vars in all modules (Example: --provide jQuery=jquery)',
      type: 'string',
    },
    'records-input-path': {
      desc: 'Path to the records file (reading)',
      type: 'string',
    },
    'records-output-path': {
      desc: 'Path to the records file (writing)',
      type: 'string',
    },
    'records-path': {
      desc: 'Path to the records file',
      type: 'string',
    },
    target: {
      desc: 'The targeted execution environment',
      type: 'string',
    },
    'watch-aggregate-timeout': {
      desc: 'Timeout for gathering changes while watching',
      // TODO: add type
    },
    'watch-poll': {
      desc: 'The polling interval for watching (also enable polling)',
      type: 'string',
    },
    'watch-stdin': {
      alias: 'stdin',
      desc: 'Exit the process when stdin is closed',
      type: 'boolean',
    },
  },
};
