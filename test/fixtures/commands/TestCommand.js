const Command = require('../../../lib/commands/Command');

module.exports = class HelpCommand extends Command {
  help() {
    return '';
  }

  // eslint-disable-next-line consistent-return
  run() {
    return true;
  }
};
