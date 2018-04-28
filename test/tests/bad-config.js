const execa = require('execa');

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
