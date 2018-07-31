const { resolve } = require('path');

module.exports = {
  entry: () => resolve(__dirname, 'webpack.config.js'),
};
