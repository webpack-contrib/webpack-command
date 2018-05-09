const { test } = require('../../util');
const Command = require('../../../lib/commands/Command');

let command;

test('help command', module, () => {
  it(`should instantiate`, () => {
    command = new Command();
    expect(command).toBeInstanceOf(Command);
  });

  it(`should display help`, () => {
    const result = command.help();
    expect(result).toMatchSnapshot();
  });

  it(`should run`, () => {
    const stub = () => command.run({});
    expect(stub).not.toThrow();
  });
});
