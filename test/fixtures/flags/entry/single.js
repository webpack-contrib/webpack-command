const config = require('../../common/webpack.config');

module.exports = {
  arguments: ['--entry', './test/fixtures/common/entry-a.js'],

  config,

  group: 'general',
};
