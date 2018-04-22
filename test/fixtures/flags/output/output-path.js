const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--output-path', './.output'],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),
};
