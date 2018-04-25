const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: [],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),

  inspect: 'stdout',

  group: 'general',
};

// the test reporter is added by default in common fixtures
delete module.exports.config.reporter;
