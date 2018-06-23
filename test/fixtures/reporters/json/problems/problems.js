const { resolve } = require('path');

const config = require('../../../common/webpack.config');

module.exports = {
  arguments: [],

  config: Object.assign({}, config, {
    entry: resolve(__dirname, './entry-problems.js'),
    reporter: 'json',
  }),

  inspect: 'stdout',

  group: 'general',
};
