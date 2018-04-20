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
  const { existsSync: exists, statSync: stat } = require('fs');
  const { sep } = require('path');

  const chalk = require('chalk');
  const meow = require('meow');

  const woof = require('./');
  const { help: commandHelp, load: getCommands } = require('./commands');
  const { help: flagHelp, opts } = require('./flags');
  /* eslint-enable global-require */

  const flagOpts = { flags: opts() };
  const log = weblog({ name: 'woof', id: 'webpack-woof-forced' });
  const cli = meow(
    chalk`
{underline Usage}
  $ webpack [<config>, ...options]
  $ webpack <entry-file> [...<entry-file>] <output-file>

{underline Options}
${flagHelp()}

  For further documentation, visit {blue https://webpack.js.org/api/cli}

{underline Commands}
${commandHelp()}

  Type \`webpack help <command>\` for more information

{underline Examples}
  $ webpack
  $ webpack
  $ webpack
`,
    flagOpts
  );

  const flags = Object.assign({}, cli.flags);
  const commands = getCommands();
  const [command] = cli.input;

  cli.commands = commands;
  cli.argv = cli.flags;

  if (flags.help) {
    cli.showHelp(0);
  }

  const cmd = cli.commands[command];

  if (cmd) {
    try {
      cmd.run(cli);
    } catch (e) {
      if (e instanceof WebpackWoofError) {
        log.error(
          chalk`The {bold \`${command}\`} command wasn't found. Try installing \`woof-command-${command}\``
        );
      } else {
        log.error(chalk`The {bold \`${command}\`} command threw an error:`);
        throw e;
      }
    }

    // if a command hasn't exited already, and nothing threw, we need to bail
    // here so that the rest of the validation, flag application, and webpack
    // api are NOT run
    process.exit(0);
  } else if (cli.input.length) {
    const problems = [];
    const isDir = (path) => stat(path).isDirectory();

    cli.flags.entry = [];

    for (let file of cli.input) {
      if (!exists(file)) {
        problems.push(file);
      } else {
        if (isDir(file)) {
          file += sep;
        }

        cli.flags.entry.push(file);
      }
    }

    if (problems.length) {
      const prefix =
        problems.length === cli.input.length ? 'The' : 'Some of the';
      log.error(`${prefix} input provided did not match any known commands or existing files:
            ${problems.join(' ')}`);
      process.exit(problems.length);
    }
  }

  woof(cli);
}
