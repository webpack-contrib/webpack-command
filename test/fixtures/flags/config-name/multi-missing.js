const { resolve } = require('path');
const WebpackCommandError = require('../../../../lib/WebpackCommandError');

module.exports = {
  arguments: ['--config-name', 'multi-missing'],

  config: [
    {
      entry: resolve(__dirname, '../../common/entry-a.js'),
      mode: 'development',
      name: 'bundle-a',
    },
    {
      entry: resolve(__dirname, '../../common/entry-b.js'),
      mode: 'development',
      name: 'bundle-b',
    },
  ],

  group: 'config',

  throws: WebpackCommandError,
};
