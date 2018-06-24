const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: [],

  config: [
    Object.assign({}, config, {
      entry: resolve(__dirname, '../../common/entry-a.js'),
      reporter: 'json',
    }),
    Object.assign({}, config, {
      entry: [
        resolve(__dirname, '../../common/entry-b.js'),
        resolve(__dirname, '../../common/entry-c.js'),
      ],
      reporter: 'json',
    }),
  ],

  inspect: 'stdout',

  group: 'general',
};
