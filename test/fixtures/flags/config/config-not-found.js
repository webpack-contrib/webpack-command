const { resolve } = require('path');

const configPath = resolve(__dirname, '../../common/webpack.config');

module.exports = {
  arguments: ['--config', configPath],

  group: 'config',
};
