'use strict';

const path = require('path');
const camelcase = require('camelcase');
const merge = require('merge-options');
const { validate } = require('./util');

// if (argv.output) {
//   let output = argv.output;
//   if (!path.isAbsolute(argv.o)) {
//     output = path.resolve(process.cwd(), output);
//   }
//   argv["output-filename"] = path.basename(output);
//   argv["output-path"] = path.dirname(output);
// }

module.exports = {
  apply(argv, options) { // eslint-disable-line no-unused-vars
    const output = {};
    const { flags } = module.exports;
    const keys = Object.keys(flags).filter(key => key !== 'output');

    for (const arg of keys) {
      const flag = flags[arg];
      let value = argv[arg];

      value = validate(flag, value);

      if (arg === 'output-path') {
        value = path.resovle(value);
      }

      if (typeof value !== 'undefined') {
        output[camelcase(arg.replace('output-', ''))] = value;
      }
    }

    options = merge({ output }, options);
  },

  flags: {
    output: {
      alias: 'o',
      desc: 'The output path and file for compilation assets',
      type: 'string'
    },
    'output-chunk-filename': {
      desc: 'The output filename for additional chunks',
      type: 'string'
    },
    'output-filename': {
      desc: 'The output filename of the bundle',
      type: 'string'
    },
    'output-jsonp-function': {
      desc: 'The name of the jsonp function used for chunk loading',
      type: 'string'
    },
    'output-library': {
      desc: 'Expose the exports of the entry point as library',
      type: 'string'
    },
    'output-library-target': {
      desc: 'The type for exposing the exports of the entry point as library',
      type: 'string'
    },
    'output-path': {
      desc: 'The output path for compilation assets',
      type: 'string'
    },
    'output-pathinfo': {
      desc: 'Include a comment with the request for every dependency (require, import, etc.)',
      type: 'boolean'
    },
    'output-public-path': {
      desc: 'The public path for the assets',
      type: 'string'
    },
    'output-source-map-filename': {
      desc: 'The output filename for the SourceMap',
      type: 'string'
    }
  },

  name: 'Output'
};
