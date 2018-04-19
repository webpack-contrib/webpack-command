// if (Array.isArray(options) && argv["config-name"]) {
//   const namedOptions = options.filter(function(opt) {
//     return opt.name === argv["config-name"];
//   });
//   if (namedOptions.length === 0) {
//     console.error(
//       "Configuration with name '" + argv["config-name"] + "' was not found."
//     );
//     process.exit(-1); // eslint-disable-line
//   } else if (namedOptions.length === 1) {
//     return processConfiguredOptions(namedOptions[0]);
//   }
//   options = namedOptions;
// }

// TODO: handle entry seperately, as it's not a flag
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

/* eslint-disable no-param-reassign */

const merge = require('merge-options');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  apply(argv, options) {
    let entry = {};

    // handle --entry file
    if (typeof argv.entry === 'string') {
      entry.cli = argv.entry;
    } else if (argv.entry) {
      // handle --entry.name file | --entry file --entry file2
      ({ entry } = argv);
    }

    if (Array.isArray(options.entry) || typeof options.entry === 'string') {
      // eslint-disable-next-line no-param-reassign
      options.entry = { main: options.entry };
    }

    entry = Object.assign(entry, options.entry);

    if (argv.configPath) {
      argv.require = argv.configPath;
    }

    options = merge(options, { mode: argv.mode, entry });
  },

  flags: {
    // TODO: handle config
    config: {
      desc: 'Path to the config file',
      type: 'string',
    },
    // TODO: handle config-name
    'config-name': {
      desc: 'Name of the config to use',
      type: 'string',
    },
    'config-register': {
      alias: 'r',
      desc:
        'Preload one or more modules before loading the webpack configuration',
      deprecated: '--require',
      type: ['string', 'array'],
    },
    mode: {
      // TODO: handle choices
      choices: ['development', 'production'],
      desc: 'Specifies the build mode to use; development or production',
      type: 'string',
    },
  },

  name: 'Configuration File',
};
