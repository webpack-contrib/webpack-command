const { resolve } = require('path');

const config = require('../../common/webpack.config');

const loaderPath = resolve(__dirname, '../../common/loader-pre');

module.exports = {
  arguments: ['--module-bind-pre', `js=${loaderPath}`],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),
};
