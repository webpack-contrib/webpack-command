const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--target', 'node'],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),
};
