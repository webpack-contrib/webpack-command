const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--plugin', 'uglifyjs-webpack-plugin'],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),
};
