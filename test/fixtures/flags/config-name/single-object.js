const { resolve } = require('path');

const config = require('../../common/webpack.config');
const WebpackCommandError = require('../../../../lib/WebpackCommandError');

module.exports = {
  arguments: ['--config-name', 'single-object'],

  config: Object.assign({}, config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
    name: 'single-object',
  }),

  group: 'config',

  throws: WebpackCommandError,
};
