const { resolve } = require('path');

const merge = require('merge-options');
const { DefinePlugin } = require('webpack');

const config = require('../../common/webpack.config');

const plugins = [new DefinePlugin({ test: 'invalid' })];

module.exports = {
  arguments: ['--define.DEFINE', `'valid'`],

  config: merge(config, {
    entry: resolve(__dirname, './entry.js'),
    plugins: config.plugins.concat(plugins),
  }),

  group: 'advanced',
};
