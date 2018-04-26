const { resolve } = require('path');

const config = require('../../common/webpack.config');

const context = resolve(__dirname, '../../common');

module.exports = {
  arguments: ['--context', context],

  config: Object.assign({}, config, {
    entry: './entry-a.js',
  }),

  group: 'general',
};
