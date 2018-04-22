const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--prefetch', './dependency.js'],

  config: Object.assign(config, {
    entry: resolve(__dirname, './entry.js'),
  }),
};
