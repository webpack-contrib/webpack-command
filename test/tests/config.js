const { test } = require('../util');
const { distill } = require('../../lib/config');

const config = [
  {
    entry: resolve(__dirname, '../../common/entry-a.js'),
    mode: 'development',
  },
  {
    entry: resolve(__dirname, '../../common/entry-b.js'),
    mode: 'development',
  },
];

test('lib/config', module, () => {
  it(`distill()`, () => {
    const result = distill({}, config, {});
    expect(result).toMatchSnapshot();
  });

  it(`distill() plugins`, () => {
    const result = distill({}, { plugins: [] }, { plugins: [1] });
    expect(result).toMatchSnapshot();
  });

  it(`distill() plugins from config array`, () => {
    const conf = [].concat(config);
    conf[0].plugins = [];
    const result = distill({}, conf, { plugins: [1] });
    expect(result).toMatchSnapshot();
  });

  it(`distill() --config-name`, () => {
    config[1].name = 'test';

    const argv = { configName: 'test' };
    const result = distill(argv, config, {});
    expect(result).toMatchSnapshot();

    delete config[1].name;
  });

  it(`distill() --config-name not found`, () => {
    const argv = { configName: 'test' };
    const stub = () => distill(argv, config, {});
    expect(stub).toThrow();
  });

  it(`distill() --config-name not array`, () => {
    const argv = { configName: 'test' };
    const stub = () => distill(argv, config[0], {});
    expect(stub).toThrow();
  });
});
