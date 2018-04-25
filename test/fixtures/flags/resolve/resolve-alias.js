const { resolve } = require('path');

const config = require('../../common/webpack.config');

const aliasPath = resolve(__dirname, 'aliased');

module.exports = {
  arguments: ['--resolve-alias.aliased', `${aliasPath}`],

  config: Object.assign(config, {
    entry: resolve(__dirname, 'entry.js'),
  }),

  group: 'resolver',
};
