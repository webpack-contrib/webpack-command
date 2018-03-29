'use strict';

// ifArg("mode", function(value) {
//   options.mode = value;
// });

module.exports = {
  name: 'Configuration File',
  flags: {
    config: {
      desc: 'Path to the config file',
      type: 'string'
    },
    'config-name': {
      desc: 'Name of the config to use',
      type: 'string'
    },
    'config-register': {
      alias: 'r',
      desc: 'Preload one or more modules before loading the webpack configuration',
      // TODO: handle array types
      type: 'array'
    },
    env: {
      desc: 'Environment passed to the config, when it is a function'
      // TODO: add type
    },
    mode: {
      // TODO: handle choices
      choices: ['development', 'production'],
      desc: 'Mode to use',
      type: 'string'
    }
  }
};
