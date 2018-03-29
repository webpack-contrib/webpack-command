'use strict';

const HelpCommand = require('./help');
const InitCommand = require('./init');

module.exports = {
  help: new HelpCommand(),
  init: new InitCommand()
};
