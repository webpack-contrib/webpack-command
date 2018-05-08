const loader = require('@webpack-contrib/config-loader');
const merge = require('merge-options');

const WebpackCommandError = require('./WebpackCommandError');

module.exports = {
  distill(argv, config, options) {
    let result;

    if (Array.isArray(config)) {
      result = config.map((conf) => merge(conf, options));
    } else {
      result = merge(options, config);
    }

    if (argv.configName) {
      if (Array.isArray(config)) {
        const found = config.find((conf) => conf.name === argv.configName);

        if (!found) {
          throw new WebpackCommandError(
            `The --config-name specified was not found`
          );
        }

        result = found;
      } else {
        throw new WebpackCommandError(
          '--config-name was used but the specified configuration is not an Array'
        );
      }
    }

    return result;
  },

  load(argv, options) {
    const loaderOptions = {
      allowMissing: true,
      configPath: argv.config,
      require: argv.require,
    };

    return loader(loaderOptions).then((result) => {
      const { config } = result;
      const { distill } = module.exports;
      const target = distill(argv, config, options);

      return target;
    });
  },
};
