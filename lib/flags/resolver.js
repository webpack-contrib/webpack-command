const chalk = require('chalk');
const merge = require('merge-options');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  apply(argv, options) {
    const result = {};

    if (argv.resolveAlias) {
      result.alias = argv.resolveAlias;
    }

    if (argv.resolveExtensions) {
      const value = argv.resolveExtensions;

      if (value) {
        result.extensions = Array.isArray(value) ? value : value.split(/,\s*/);
      }
    }

    if (argv.resolveLoaderAlias) {
      result.resolveLoader = argv.resolveAlias;
    }

    // eslint-disable-next-line no-param-reassign
    options = merge(result, options);
  },

  flags: {
    'resolve-alias': {
      desc: chalk`Setup a module alias for resolving
{dim e.g. jquery=jquery.plugin}`,
      type: 'string',
    },
    'resolve-extensions': {
      desc: chalk`Setup extensions that should be used to resolve modules
{dim e.g. .es6,.js}`,
      type: 'array',
    },
    'resolve-loader-alias': {
      desc: 'Setup a loader alias for resolving',
      type: 'string',
    },
  },

  name: 'Resolver',
};
