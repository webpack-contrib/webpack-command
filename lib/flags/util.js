const chalk = require('chalk');
const loadUtils = require('loader-utils');
const merge = require('merge-options');
const resolve = require('enhanced-resolve');
const weblog = require('webpack-log');

module.exports = {
  bind(value, enforce, options) {
    if (!value) {
      return;
    }

    let [extension, loader] = value.split('=');

    // this is logic copied from webpack-cli/convert-arg. not entirely sure why
    // this is done, perhaps for something like `--module-bind js`?
    if (extension && !loader) {
      loader = `${extension}-loader`;
    }

    // eslint-disable-next-line no-useless-escape
    extension = extension.replace(
      // eslint-disable-next-line no-useless-escape
      /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      '\\$&'
    );

    const test = new RegExp(`\\.${extension}$`);
    const rule = { enforce, loader, test };

    // eslint-disable-next-line no-param-reassign
    options = merge({ module: { rules: [] } }, options);
    options.module.rules.push(rule);
  },

  loadPlugin(name) {
    const log = weblog({ name: 'woof', id: 'webpack-woof' });
    const queryPos = name && name.indexOf('?');
    let args;
    let pluginPath;

    try {
      if (queryPos > -1) {
        args = loadUtils.parseQuery(name.substring(queryPos));
        // eslint-disable-next-line no-param-reassign
        name = name.substring(0, queryPos);
      }
    } catch (e) {
      log.error(`Invalid plugin arguments ${name} (${e}).`);
      throw e;
    }

    try {
      pluginPath = resolve.sync(process.cwd(), name);
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const PluginClass = require(pluginPath);
      return new PluginClass(args);
    } catch (e) {
      log.error(chalk`Cannot load plugin ${name} {grey from ${pluginPath}}`);
      throw e;
    }
  },

  // eslint-disable-next-line consistent-return
  validate(flag, value) {
    if (!flag.type) {
      return value;
    }

    // eslint-disable-next-line valid-typeof
    if (typeof value === flag.type) {
      // eslint-disable-line valid-typeof
      return value;
    }
  },
};
