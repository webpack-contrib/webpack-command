const progress = require('../../lib/progress');
const { test } = require('../util');

test('progress util', module, () => {
  // e.g. building modules|5/6 modules|1 active|/node_modules/lodash/lodash.js
  //      building modules|14/14 modules|0 active|
  //      finish module graph
  //      finish module graph|FlagDependencyExportsPlugin

  it('should parse args: all args', () => {
    const args = [
      false,
      '0.1',
      'building modules',
      '5/6 modules',
      '1 active',
      '/node_modules/lodash/lodash.js',
    ];
    const result = progress.parseArgs(...args);

    expect(result).toMatchSnapshot();
  });

  it('should parse args: no filename', () => {
    const args = [false, '0.1', 'building modules', '5/6 modules', '1 active'];
    const result = progress.parseArgs(...args);

    expect(result).toMatchSnapshot();
  });

  it('should parse args: only step name', () => {
    const args = [false, '0.1', 'finish module graph'];
    const result = progress.parseArgs(...args);

    expect(result).toMatchSnapshot();
  });

  it('should parse args: step name and scope', () => {
    const args = [
      false,
      '0.1',
      'finish module graph',
      'FlagDependencyExportsPlugin',
    ];
    const result = progress.parseArgs(...args);

    expect(result).toMatchSnapshot();
  });
});
