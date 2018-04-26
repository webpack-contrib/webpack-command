const { resolve } = require('path');

module.exports = {
  arguments: [],

  config: [
    {
      entry: resolve(__dirname, '../../common/entry-a.js'),
      mode: 'development',
    },
    {
      entry: resolve(__dirname, '../../common/entry-b.js'),
      mode: 'development',
      watch: true,
    },
  ],

  group: 'advanced',
};
