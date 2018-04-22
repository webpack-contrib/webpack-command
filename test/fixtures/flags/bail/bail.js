const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--bail'],

  config: Object.assign(config, {
    entry: resolve(__dirname, './entry.js'),
  }),
};
