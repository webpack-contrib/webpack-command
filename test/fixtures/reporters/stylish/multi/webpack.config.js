const path = require('path');

const webpack = require('webpack');

module.exports = [
  {
    context: __dirname,
    entry: './client.js',
    output: {
      filename: 'client.js',
      path: path.join(__dirname, '/dist/client'),
      publicPath: '/static/',
    },
    plugins: [new webpack.NamedModulesPlugin()],
    stats: 'none',
  },
  {
    context: __dirname,
    entry: './server.js',
    output: {
      filename: 'server.js',
      path: path.join(__dirname, '/dist/server'),
    },
    plugins: [new webpack.NamedModulesPlugin()],
    stats: 'none',
  },
];
