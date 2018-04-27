const path = require('path');

const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // mode: 'development',x
  context: __dirname,
  devtool: 'source-map',
  entry: './entry.js',
  output: {
    filename: './output.js',
    path: path.join(__dirname, '/dist'),
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new StyleLintPlugin({
      configFile: path.join(__dirname, '/.stylelintrc'),
    }),
  ],
  stats: 'none',
};
