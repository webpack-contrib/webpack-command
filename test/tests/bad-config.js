const execa = require('execa');

const { test } = require('../util');

test('Zero Config', module, () => {
  it('should run', () => {
    const cliPath = resolve(__dirname, '../../lib/cli');
    const cwd = resolve(__dirname, '../fixtures/bad-config');
    const stub = () => execa.sync('node', [cliPath], { cwd });

    expect(stub).toThrowErrorMatchingSnapshot();
  });
});
