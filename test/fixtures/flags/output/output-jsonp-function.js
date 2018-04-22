const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--output-jsonp-function', 'output-func'],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),
};
