const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--progress'],

  config: Object.assign({}, config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),

  inspect: 'stdout',

  group: 'general',
};
