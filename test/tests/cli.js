const execa = require('execa');
const strip = require('strip-ansi');

const { test } = require('../util');

test('Bad Config', module, () => {
  it('should run', () => {
    const cliPath = resolve(__dirname, '../../lib/cli');
    const cwd = resolve(__dirname, '../fixtures/bad-config');

    try {
      execa.sync('node', [cliPath], { cwd });
    } catch (e) {
      expect(e.message).toMatch(
        `options['batman']  is an invalid additional property`
      );
    }
  });
});

test('Function Entry Config', module, () => {
  it('should be used', () => {
    const cliPath = resolve(__dirname, '../../lib/cli');
    const cwd = resolve(__dirname, '../fixtures/function-entry-config');

    // This will report `Can't resolve './src'` if the entry function is lost.
    expect(() => execa.sync('node', [cliPath], { cwd })).not.toThrow();
  });
});

test('Zero Config', module, () => {
  it('should run', () => {
    const cliPath = resolve(__dirname, '../../lib/cli');
    const cwd = resolve(__dirname, '../fixtures/zero-config');
    const result = execa.sync('node', [cliPath], { cwd });

    expect(
      strip(result.stdout)
        .replace(/Δt \d+ms/g, '<duration>')
        .replace(/v\d\.\d\.\d/, '<version>')
    ).toMatchSnapshot();
  }).timeout(4000);
});

test('Commands', module, () => {
  it('should show cli help', () => {
    const cliPath = resolve(__dirname, '../../lib/cli.js');
    const result = execa.sync('node', [cliPath, '--help']);

    expect(
      strip(result.stdout).replace(/Δt \d+ms/g, '<duration>')
    ).toMatchSnapshot();
  });

  it('should show teach command help', () => {
    const cliPath = resolve(__dirname, '../../lib/cli.js');
    const result = execa.sync(cliPath, ['help', 'teach']);

    expect(result.stdout.replace(/v\d\.\d\.\d/, '<version>')).toMatchSnapshot();
  }).timeout(4000);

  it('should throw on command error', () => {
    const cliPath = resolve(__dirname, '../../lib/cli.js');
    const stub = () => execa.sync(cliPath, ['help', 'bad-command']);

    // TODO: move to error codes
    expect(stub).toThrow(/'bad-command' has not been installed/);
  }).timeout(4000);

  it('should throw on missing command', () => {
    const cliPath = resolve(__dirname, '../../lib/cli.js');
    const stub = () =>
      execa.sync(cliPath, ['bad-command'], {
        env: {
          CLI_TEST: 'true',
        },
      });

    // TODO: move to error codes
    expect(stub).toThrow(/bad-command/);
  }).timeout(4000);

  it('should add directories to entries', () => {
    const cliPath = resolve(__dirname, '../../lib/cli.js');
    const srcPath = resolve(__dirname, '../../test/fixtures/flags/config/src');
    const result = execa.sync(cliPath, [srcPath]);

    expect(
      strip(result.stdout).replace(/Δt \d+ms/g, '<duration>')
    ).toMatchSnapshot();
  }).timeout(4000);

  it('should accept custom reporters relative to the current working directory', () => {
    const cliPath = resolve(__dirname, '../../lib/cli.js');
    const srcPath = resolve(__dirname, '../../test/fixtures/flags/config/src');
    const result = execa.sync(
      cliPath,
      ['--reporter', '../../lib/reporters/BasicReporter', srcPath],
      {
        cwd: __dirname,
      }
    );

    expect(
      strip(result.stdout)
        .replace(/Version: webpack \d+\.\d+\.\d+/, '<version>')
        .replace(/Time: \d+ms/g, '<duration>')
        .replace(/Built at: .+(?=\n)/g, '<datetime>')
        .replace(/[a-f0-9]{20}/g, '<hash>')
        .replace(/\d+ bytes/g, '<size>')
    ).toMatchSnapshot();
  }).timeout(4000);
});
