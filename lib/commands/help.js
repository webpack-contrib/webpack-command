// TODO:
//   - webpack help [command] : display help for a command
//   - webpack help [--flag]  : launch cli page to flag
//   - webpack help           : launch docs site

const Command = require('./Command');

module.exports = class HelpCommand extends Command {};
