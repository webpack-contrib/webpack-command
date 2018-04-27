const path = require('path');

module.exports = {
  // mode: 'development',x
  context: __dirname,
  devtool: 'source-map',
  entry: './entry.js',
  output: {
    filename: './output.js',
    path: path.join(__dirname, '/dist'),
  },
  plugins: [],
  stats: 'none',
};
