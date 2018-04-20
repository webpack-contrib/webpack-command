const config = require('../../common/webpack.config');

module.exports = {
  arguments: [
    '--entry',
    '../../common/entry-a.js',
    '--entry',
    '../../common/entry-b.js',
  ],

  config,
};
