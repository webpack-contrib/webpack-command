const { resolve } = require('path');

const config = require('../../common/webpack.config');

const preLoaderPath = resolve(__dirname, '../../common/loader-pre');

module.exports = {
  // TODO: no one knows how this works
  arguments: ['--resolve-loader-alias', `aliased=${preLoaderPath}`],

  config: Object.assign(config, {
    entry: resolve(__dirname, './entry-loader-alias.js'),
  }),
};
