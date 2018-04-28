const execa = require('execa');
const strip = require('strip-ansi');

const { test } = require('../util');

test('Zero Config', module, () => {
  it('should run', () => {
    const cliPath = resolve(__dirname, '../../lib/cli');
    const cwd = resolve(__dirname, '../fixtures/zero-config');
    const result = execa.sync('node', [cliPath], { cwd });

    expect(
      strip(result.stdout).replace(/Δt \d+ms/g, '<duration>')
    ).toMatchSnapshot();
  });
});
