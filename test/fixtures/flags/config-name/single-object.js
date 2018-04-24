const { resolve } = require('path');

const config = require('../../common/webpack.config');
const WebpackWoofError = require('../../../../lib/WebpackWoofError');

module.exports = {
  arguments: ['--config-name', 'single-object'],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
    name: 'single-object',
  }),

  group: 'config',

  throws: WebpackWoofError,
};
