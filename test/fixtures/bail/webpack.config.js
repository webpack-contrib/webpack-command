const { resolve } = require('path');

const { NamedModulesPlugin } = require('webpack');

module.exports = {
  bail: true,
  entry: resolve(__dirname, 'entry.js'),
  mode: 'development',
  plugins: [new NamedModulesPlugin()],
  reporter: resolve(__dirname, 'test-reporter.js'),
};
