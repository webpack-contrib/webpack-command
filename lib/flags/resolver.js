const chalk = require('chalk');
const merge = require('merge-options');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  apply(argv, options) {
    const result = {};

    if (argv.resolveAlias) {
      const value = argv.resolveAlias;

      if (value) {
        // TODO: remove this custom key=value bs
        const pair = value.split('=');
        if (pair.length === 2) {
          const alias = {};
          const [name, resolves] = pair;
          alias[name] = resolves;
          result.resolve = { alias };
        }
      }
    }

    if (argv.resolveExtensions) {
      const value = argv.resolveExtensions;

      if (value) {
        result.extensions = Array.isArray(value) ? value : value.split(/,\s*/);
      }
    }

    if (argv.resolveLoaderAlias) {
      const value = argv.resolveAlias;

      if (value) {
        const pair = value.split('=');
        if (pair.length === 2) {
          const alias = {};
          const [name, resolves] = pair;
          alias[name] = resolves;
          result.resolveLoader = { alias };
        }
      }
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
