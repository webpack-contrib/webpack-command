const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--optimize-max-chunks', '1000'],

  config: Object.assign(config, {
    entry: [
      resolve(__dirname, '../../common/entry-a.js'),
      resolve(__dirname, '../../common/entry-b.js'),
      resolve(__dirname, '../../common/entry-c.js'),
    ],
  }),

  group: 'optimization',
};
