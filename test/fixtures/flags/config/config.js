const { resolve } = require('path');

const configPath = resolve(__dirname, './argv.config.js');
const reporterPath = resolve(__dirname, '../../common/test-reporter.js');

module.exports = {
  arguments: [
    '--config',
    configPath,
    '--context',
    __dirname,
    '--reporter',
    reporterPath,
  ],

  group: 'config',
};
