const merge = require('merge-options');

const { validate } = require('./util');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  apply(argv, options) {
    const { flags } = module.exports;
    const result = {};

    if (argv.resolveAlias) {
      const value = validate(flags['resolve-alias'], argv.resolveAlias);

      if (value) {
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
      const value = validate(
        flags['resolve-extension'],
        argv.resolveExtensions
      );

      if (value) {
        result.extensions = Array.isArray(value) ? value : value.split(/,\s*/);
      }
    }

    if (argv.resolveLoaderAlias) {
      const value = validate(flags['resolve-loader-alias'], argv.resolveAlias);

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
      desc: 'Setup a module alias for resolving. e.g. jquery=jquery.plugin',
      type: 'string',
    },
    'resolve-extensions': {
      desc:
        'Setup extensions that should be used to resolve modules. e.g. .es6,.js',
      type: 'array',
    },
    'resolve-loader-alias': {
      desc: 'Setup a loader alias for resolving',
      type: 'string',
    },
  },

  name: 'Resolver',
};
