const camelcase = require('camelcase');
const capitalize = require('titleize');
const merge = require('merge-options');
const webpack = require('webpack');
const weblog = require('webpack-log');

function makeCallback(options) {
  const { compiler, config, resolve, reject } = options;
  const { reporter, watch } = config;

  return (error, stats) => {
    const log = weblog({ name: 'webpack', id: 'webpack-command' });
    const Reporter = requireReporter(reporter || 'stylish');
    const actualReporter = new Reporter({ compiler, config });

    if (error || !watch) {
      // for some reason webpack-cli invalidates the cache here. there's no
      // documentation as to why, so we're going to assume there's a reason.
      compiler.purgeInputFileSystem();
      log.debug('Input File System Purged');
    }

    if (error) {
      reject(error);
      return;
    }

    const result = actualReporter.render(error, stats);

    resolve(result);
  };
}

/**
 * Attempts to require a specified reporter. Tries the local built-ins first,
 * and if that fails, attempts to load an npm module that exports a reporter
 * handler function.
 */
function requireReporter(name, local = true) {
  const prefix = capitalize(camelcase(name));
  const target = local ? `./reporters/${prefix}Reporter` : name;

  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const result = require(target);
    return result;
  } catch (e) {
    if (local) {
      return requireReporter(name, false);
    }

    return null;
  }
}

/**
 * Removes invalid webpack config properties leftover from applying flags
 */
function sanitize(config) {
  const configs = [].concat(config).map((conf) => {
    const result = merge({}, conf);
    delete result.reporter;
    delete result.watchStdin;

    // TODO: remove the need for this
    for (const property of ['entry', 'output']) {
      const target = result[property];
      if (target && Object.keys(target).length === 0) {
        delete result[property];
      }
    }

    return result;
  });

  // if we always return an array, every compilation will be a MultiCompiler
  return configs.length > 1 ? configs : configs[0];
}

module.exports = (config) => {
  const log = weblog({ name: 'webpack', id: 'webpack-command' });
  const target = sanitize(config);
  const compiler = webpack(target);
  const { done, run } = compiler.hooks;

  run.tap('WebpackCommand', () => {
    log.info('Starting Build');
  });

  done.tap('WebpackCommand', () => {
    log.info('Build Finished');
  });

  return {
    run() {
      return new Promise((resolve, reject) => {
        const configs = [].concat(config);
        const [first] = configs;
        const { watchOptions } = first;
        /** @type {{stdin?: string}} */
        const { stdin } = watchOptions || {};
        const callback = makeCallback({
          compiler,
          config: first,
          resolve,
          reject,
        });

        if (first.watch) {
          log.info('Watching enabled');
          compiler.watch(watchOptions, callback);
        } else {
          compiler.run(callback);
        }

        /* istanbul ignore if */
        if (stdin) {
          process.stdin.on('end', () => {
            process.exit();
          });

          process.stdin.resume();
        }
      });
    },
  };
};
