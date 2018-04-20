const { NamedModulesPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  plugins: [new NamedModulesPlugin()],
};
