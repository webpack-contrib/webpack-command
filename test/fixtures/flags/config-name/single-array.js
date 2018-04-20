const { resolve } = require('path');

module.exports = {
  arguments: ['--config-name', 'single-object'],

  config: [
    {
      entry: resolve(__dirname, '../../common/entry-a.js'),
      mode: 'development',
      name: 'single-object',
    },
  ],
};
