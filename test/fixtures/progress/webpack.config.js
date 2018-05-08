const { resolve } = require('path');

const { NamedModulesPlugin } = require('webpack');

module.exports = {
  entry: resolve(__dirname, './entry.js'),
  mode: 'development',
  plugins: [new NamedModulesPlugin()],
};
