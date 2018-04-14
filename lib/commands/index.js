const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const execa = require('execa');

const HelpCommand = require('./HelpCommand');

const isDirectory = (source) => lstatSync(source).isDirectory();

function listInstalled(source) {
  return readdirSync(source)
    .map((name) => join(source, name))
    .filter(isDirectory)
    .filter((directory) => directory.startsWith('woof-command-'));
}

function load() {
  const cwd = process.cwd();
  const { stdout: localPath } = execa.sync('npm', ['root'], { cwd });
  const { stdout: globalPath } = execa.sync('npm', ['root', '-g'], { cwd });
  const local = listInstalled(localPath);
  const global = listInstalled(globalPath);

  const commands = {
    help: new HelpCommand(),
  };

  for (const command of [].concat(local, global)) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const CommandClass = require(command);
    commands[command] = new CommandClass();
  }

  return commands;
}

module.exports = {
  help() {
    const result = Object.keys(load())
      .sort()
      .join('\n  ');

    return `  ${result}`;
  },

  load,
};
