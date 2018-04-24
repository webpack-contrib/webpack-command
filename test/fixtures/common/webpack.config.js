const { resolve } = require('path');

const { NamedModulesPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  plugins: [new NamedModulesPlugin()],
  reporter: resolve(__dirname, 'test-reporter.js'),
};
