const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--watch-poll', 1000],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),

  group: 'advanced',
};
