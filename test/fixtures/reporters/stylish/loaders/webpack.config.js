const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  entry: './entry.js',
  output: {
    filename: './output.js',
    path: path.join(__dirname, '/dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Fixture',
    }),
  ],
  stats: 'none',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
