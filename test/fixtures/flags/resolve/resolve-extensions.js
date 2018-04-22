const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--resolve-extensions', '.custom'],

  config: Object.assign(config, {
    entry: resolve(__dirname, 'entry-extensions.js'),
  }),
};
