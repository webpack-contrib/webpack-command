// TODO: - webpack help           : launch docs site

const chalk = require('chalk');
const open = require('opn');

const pkg = require('../../package.json');

const Command = require('./Command');

class HelpCommandError extends Command.CommandError {
  constructor(...args) {
    super(...args);
    this.name = 'HelpCommandError';
  }
}

module.exports = class HelpCommand extends Command {
  help() {
    return chalk`
  {blue help} v${pkg.version}

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

    if (!target) {
      open('https://webpack.js.org/');
    }

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
