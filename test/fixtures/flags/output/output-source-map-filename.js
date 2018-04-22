const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--output-source-map-filename', 'output-[name].map'],

  config: Object.assign(config, {
    devtool: 'source-map',
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),
};
