const merge = require('merge-options');
const webpack = require('webpack');
const weblog = require('webpack-log');

function callback(options) {
  const { compiler, reporter, watch } = options;

  return (error, stats) => {
    const log = weblog({ name: 'woof', id: 'webpack-woof' });
    const Reporter = requireReporter(reporter || 'stylish');
    const { render } = new Reporter(compiler);

    if (error || !watch) {
      // for some reason webpack-cli invalidates the cache here. there's no
      // documentation as to why, so we're going to assume there's a reason.
      compiler.purgeInputFileSystem();
      log.debug('Input File System Purged');
    }

    render(error, stats);
  };
}

/**
 * Attempts to require a specified reporter. Tries the local built-ins first,
 * and if that fails, attempts to load an npm module that exports a reporter
 * handler function.
 */
function requireReporter(name, local = true) {
  /* eslint-disable import/no-dynamic-require, global-require */
  const target = local ? `./reporters/${name}` : name;
  try {
    return require(target);
  } catch (e) {
    if (local) {
      return requireReporter(name, false);
    }

    return null;
  }
  /* eslint-enable import/no-dynamic-require, global-require */
}

/**
 * Removes invalid webpack config properties leftover from applying flags
 */
function sanitize(config) {
  const result = merge({}, config);

  delete result.reporter;
  delete result.watchStdin;

  return result;
}

module.exports = (config) => {
  const log = weblog({ name: 'woof', id: 'webpack-woof' });
  const target = sanitize(config);
  const compiler = webpack(target);
  const { beforeCompile, afterCompile } = compiler.hooks;

  beforeCompile.tap('WebpackWoof', () => {
    log.info('Beginning compilation');
  });

  afterCompile.tap('WebpackWoof', () => {
    log.info('Compilation finished');
  });

  return {
    run() {
      const configs = [].concat(config);
      const [first] = configs;
      const { watchStdin, watchOptions } = first;
      const hollerback = callback(compiler);

      if (first.watch) {
        log.info('Watching enabled');
        compiler.watch(watchOptions, hollerback);
      } else {
        compiler.run(hollerback);
      }

      if (watchStdin) {
        process.stdin.on('end', () => {
          process.exit();
        });

        process.stdin.resume();
      }
    },
  };
};
