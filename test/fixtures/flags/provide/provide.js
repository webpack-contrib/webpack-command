const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--provide.$', 'jquery', '--provide.jQuery', 'jquery'],

  config: Object.assign({}, config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),

  group: 'advanced',
};
