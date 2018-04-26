const config = require('../../common/webpack.config');

module.exports = {
  arguments: [
    '--entry',
    './test/fixtures/common/entry-a.js',
    '--entry',
    './test/fixtures/common/entry-b.js',
  ],

  config: Object.assign({}, config),

  group: 'general',
};
