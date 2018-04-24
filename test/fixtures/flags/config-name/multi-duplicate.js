const { resolve } = require('path');

module.exports = {
  arguments: ['--config-name', 'multi-duplicate'],

  config: [
    {
      entry: resolve(__dirname, '../../common/entry-a.js'),
      mode: 'development',
      name: 'bundle-a',
    },
    {
      entry: resolve(__dirname, '../../common/entry-b.js'),
      mode: 'development',
      name: 'multi-duplicate',
    },
    {
      entry: resolve(__dirname, '../../common/entry-c.js'),
      mode: 'development',
      name: 'multi-duplicate',
    },
  ],

  group: 'config',
};
