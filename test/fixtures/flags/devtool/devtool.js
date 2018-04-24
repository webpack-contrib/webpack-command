const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--devtool', 'cheap-source-map'],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),

  group: 'general',
};
