// TODO:
//   - webpack help [command] : display help for a command
//   - webpack help [--flag]  : launch cli page to flag
//   - webpack help           : launch docs site

const chalk = require('chalk');

const pkg = require('../../package.json');

const Command = require('./Command');

class HelpCommandError extends Error {}

module.exports = class HelpCommand extends Command {
  help() {
    return chalk`
  help v${pkg.version}

  Displays help for a given installed webpack-woof command.

  {underline Usage}
    $ webpack help <command>

  {underline Examples}
    $ webpack help init
    $ webpack help serve
`;
  }

  run(cli) {
    const [, target] = cli.input;
    const command = cli.commands[target];

    if (!command) {
      throw new HelpCommandError(
        `The command '${target}' has not been installed`
      );
    }

    // eslint-disable-next-line no-console
    console.log(command.help());
  }
};
