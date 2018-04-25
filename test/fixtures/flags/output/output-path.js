const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--output-path', './dist/.output'],

  config: Object.assign(config, {
    entry: resolve(__dirname, './output-entry.js'),
  }),

  group: 'output',
};
