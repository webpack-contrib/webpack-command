const { resolve } = require('path');

const config = require('../../common/webpack.config');

const postLoaderPath = resolve(__dirname, '../../common/loader-post');
const preLoaderPath = resolve(__dirname, '../../common/loader-pre');

module.exports = {
  arguments: [
    '--module-bind-pre',
    `js=${preLoaderPath}`,
    '--module-bind',
    'json',
    '--module-bind-post',
    `js=${postLoaderPath}`,
  ],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),

  group: 'module',
};
