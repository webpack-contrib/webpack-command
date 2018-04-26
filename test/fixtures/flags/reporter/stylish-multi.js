const { resolve } = require('path');

const config = require('../../common/webpack.config');

module.exports = {
  arguments: [],

  config: [
    Object.assign({}, config, {
      entry: resolve(__dirname, '../../common/entry-a.js'),
    }),
    Object.assign({}, config, {
      entry: [
        resolve(__dirname, '../../common/entry-b.js'),
        resolve(__dirname, '../../common/entry-c.js'),
      ],
    }),
  ],

  inspect: 'stdout',

  group: 'general',
};

// the test reporter is added by default in common fixtures
for (const conf of module.exports.config) {
  delete conf.reporter;
}
