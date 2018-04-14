#!/usr/bin/env node

if (!module.parent) {
  // eslint-disable-next-line global-require
  const { register } = require('./global');

  register();
}

const debug = require('debug')('webpack-woof');
const importLocal = require('import-local'); // eslint-disable-line import/order
const weblog = require('webpack-log');

const WebpackWoofError = require('./WebpackWoofError');

// Prefer the local installation of webpack-serve
/* istanbul ignore if */
if (importLocal(__filename)) {
  debug('Using local install of webpack-serve');
} else {
  run();
}

function run() {
  /* eslint-disable global-require */
  const chalk = require('chalk');
  const cosmiconfig = require('cosmiconfig');
  const meow = require('meow');

  const woof = require('./');
  const { help: commandHelp, load: getCommands } = require('./commands');
  const { help: flagHelp } = require('./flags');

  /* eslint-enable global-require */

  const cli = meow(chalk`
{underline Usage}
  $ webpack [<config>, ...options]
  $ webpack <entry-file> [...<entry-file>] <output-file>

{underline Options}
${flagHelp()}

  For further documentation, visit https://webpack.js.org/api/cli

{underline Commands}
${commandHelp()}

  Type \`webpack help <command>\` for more information

{underline Examples}
  $ webpack
  $ webpack
  $ webpack
`);

  // TODO: load config using 'interpret' module

  const flags = Object.assign({}, cli.flags);
  const commands = getCommands();
  const cosmicOptions = {
    rcExtensions: true,
    sync: true,
  };
  const explorer = cosmiconfig('webpack', cosmicOptions);
  const { config } = explorer.load() || {};
  const [command, input] = cli.input;

  cli.commands = commands;

  if (flags.help || (command === 'help' && !input)) {
    cli.showHelp(0);
  }

  if (cli.input.length) {
    try {
      const commandModule = cli.commands[command];

      if (!commandModule) {
        throw new WebpackWoofError(`Command \`${command}\` not found`);
      }

      commandModule.run(cli);
    } catch (e) {
      const log = weblog({ name: 'woof', id: 'webpack-woof' });

      if (e instanceof WebpackWoofError) {
        log.error(
          chalk`The {bold \`${command}\`} command wasn't found. Try installing \`woof-command-${command}\``
        );
      } else {
        log.error(chalk`The {bold \`${command}\`} command threw an error:`);
        log.error(e);
      }
    }
  } else {
    woof(config, cli);
  }
}
