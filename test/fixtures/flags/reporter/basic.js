const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--reporter', 'basic'],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
    stats: {
      builtAt: false,
      hash: false,
      timings: false,
    },
  }),

  inspect: 'stdout',

  group: 'general',
};
