const { existsSync: exists } = require('fs');
const { resolve } = require('path');

const { apply, build, crcDist, test, validate } = require('../../util');

const fixture = 'devtool/devtool';
const opts = { fixture };

let config;

test('--devtool', module, () => {
  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });

  it(`should build`, () =>
    build(config).then((result) => {
      const mapPath = resolve(__dirname, '../../../dist/main.js.map');
      expect(exists(mapPath));
      expect(result).toMatchSnapshot();
      expect(crcDist()).toMatchSnapshot();
      expect(crcDist(mapPath)).toMatchSnapshot();
    }));
});
