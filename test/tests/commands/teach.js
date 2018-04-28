const { readFileSync: read } = require('fs');

const { test } = require('../../util');

const TeachCommand = require('../../../lib/commands/TeachCommand');

const dataFilePath = resolve('./data/commands.json');
const testCommandPath = resolve('./test/fixtures/commands/TestCommand.js');

const { TeachCommandError } = TeachCommand;
const command = new TeachCommand();

test('teach command', module, () => {
  it('should throw for no args', () => {
    const stub = () => command.run({ flags: {} });

    expect(stub).toThrowErrorMatchingSnapshot(TeachCommandError);
  });

  it('should throw for no --command value', () => {
    const flags = { command: true };
    const stub = () => command.run({ flags });

    expect(stub).toThrowErrorMatchingSnapshot(TeachCommandError);
  });

  it('should throw for no --module', () => {
    const flags = { command: 'test' };
    const stub = () => command.run({ flags });

    expect(stub).toThrowErrorMatchingSnapshot(TeachCommandError);
  });

  it('should throw for no --module value', () => {
    const flags = { command: 'test', module: true };
    const stub = () => command.run({ flags });

    expect(stub).toThrowErrorMatchingSnapshot(TeachCommandError);
  });

  it('should throw for missing --module', () => {
    const flags = { command: 'test', module: 'missing-module' };
    const stub = () => command.run({ flags });

    expect(stub).toThrowErrorMatchingSnapshot(TeachCommandError);
  });

  it('should learn module', () => {
    const flags = { command: 'test', module: testCommandPath };
    command.run({ flags });

    expect(read(dataFilePath, 'utf-8')).toMatchSnapshot();
  });

  it('should throw for duplicate modules', () => {
    const flags = { command: 'test', module: testCommandPath };
    const stub = () => command.run({ flags });

    expect(stub).toThrowErrorMatchingSnapshot(TeachCommandError);
  });

  it('should forget module', () => {
    const flags = { command: 'test', forget: true };
    command.run({ flags });

    expect(read(dataFilePath, 'utf-8')).toMatchSnapshot();
  });
});
