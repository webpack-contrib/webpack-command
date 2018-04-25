const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: [
    '--records-input-path',
    './dist/records-input.json',
    '--records-output-path',
    './dist/records-output.json',
  ],

  config: Object.assign(config, {
    entry: resolve(__dirname, '../../common/entry-a.js'),
  }),

  group: 'advanced',
};
