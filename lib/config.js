const { isAbsolute, resolve } = require('path');

const loader = require('@webpack-contrib/config-loader');
const merge = require('merge-options');

const WebpackCommandError = require('./WebpackCommandError');

module.exports = {
  distill(argv, config, options) {
    let result;

    if (Array.isArray(config)) {
      result = config.map((conf) => {
        const res = merge(conf, options);
        const { plugins } = conf;

        if (plugins && Array.isArray(plugins) && options.plugins) {
          res.plugins = plugins.concat(options.plugins);
        }

        return res;
      });
    } else {
      result = merge(options, config);
      const { plugins } = result;

      if (plugins && Array.isArray(plugins) && options.plugins) {
        result.plugins = plugins.concat(options.plugins);
      }
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

    if (argv.config) {
      if (isAbsolute(argv.config)) {
        loaderOptions.configPath = argv.config;
      } else {
        loaderOptions.configPath = resolve(process.cwd(), argv.config);
      }
    }

    return loader(loaderOptions).then((result) => {
      const { config } = result;
      const { distill } = module.exports;
      const target = distill(argv, config, options);

      return target;
    });
  },
};
