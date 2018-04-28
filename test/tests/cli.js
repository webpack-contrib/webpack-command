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
  });
});

test('Commands', module, () => {
  it('should show cli help', () => {
    const cliPath = resolve(__dirname, '../../lib/cli');
    const result = execa.sync('node', [cliPath, '--help']);

    expect(
      strip(result.stdout).replace(/Δt \d+ms/g, '<duration>')
    ).toMatchSnapshot();
  });

  it('should show help command help', () => {
    const cliPath = resolve(__dirname, '../../lib/cli');
    const result = execa.sync('node', [cliPath, 'help', 'teach']);

    expect(result.stdout.replace(/v\d\.\d\.\d/, '<version>')).toMatchSnapshot();
  });
});
