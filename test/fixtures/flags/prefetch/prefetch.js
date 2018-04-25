const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--prefetch', './test/fixtures/flags/prefetch/dependency.js'],

  config: Object.assign(config, {
    entry: resolve(__dirname, './entry.js'),
  }),

  group: 'advanced',
};
