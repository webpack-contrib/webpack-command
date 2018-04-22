const { resolve } = require('path');

const { DefinePlugin } = require('webpack');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--define.test', 'ok'],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
    plugins: [new DefinePlugin({ test: 'value' })],
  }),
};
