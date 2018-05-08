const { test } = require('../../util');
const HelpCommand = require('../../../lib/commands/HelpCommand');
const {
  help: commandHelp,
  load: getCommands,
} = require('../../../lib/commands/');

let command;
const commands = getCommands();
const { HelpCommandError } = HelpCommand;

test('help command', module, () => {
  it(`should instantiate`, () => {
    command = new HelpCommand();
    expect(command).toBeInstanceOf(HelpCommand);
  });

  it(`should display help`, () => {
    let result = command.help();
    result = result.replace(/\d+\.\d+\.\d+/, '<version>');
    expect(result).toMatchSnapshot();
  });

  it(`should display all commands`, () => {
    const result = commandHelp();
    expect(result).toMatchSnapshot();
  });

  it(`should display help for the help command`, () => {
    const cli = {
      commands,
      input: ['help', 'help'],
    };
    const stdout = false;
    let result = command.run(cli, { stdout });
    result = result.replace(/\d+\.\d+\.\d+/, '<version>');

    expect(result).toMatchSnapshot();
  });

  it(`should display help for the teach command`, () => {
    const cli = {
      commands,
      input: ['help', 'teach'],
    };
    const stdout = false;
    let result = command.run(cli, { stdout });
    result = result.replace(/\d+\.\d+\.\d+/, '<version>');

    expect(result).toMatchSnapshot();
  });

  it(`should throw for unknown command`, () => {
    const cli = {
      commands,
      input: ['help', 'unknown'],
    };
    const stub = () => command.run(cli);

    expect(stub).toThrow(HelpCommandError);
  });
});
