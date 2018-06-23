const { test } = require('../util');
const { distill } = require('../../lib/config');
const { apply } = require('../../lib/flags');

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

  it(`distill() context`, () => {
    const argv = {};
    const options = apply({}, {});

    let result = distill(argv, { context: 'batman' }, { context: 'superman' });
    expect(result.context).toBe('superman');

    result = distill(argv, { context: 'batman' }, options);
    expect(result.context).toBe('batman');

    result = distill(argv, {}, options);
    expect(result.context).toBe(process.cwd());
  });

  it(`distill() plugins`, () => {
    let result = distill({}, {}, { plugins: [1] });
    expect(result).toMatchSnapshot();

    result = distill({}, { plugins: [] }, { plugins: [1] });
    expect(result).toMatchSnapshot();

    result = distill({}, { plugins: [1] }, { plugins: [1] });
    expect(result).toMatchSnapshot();
  });

  it(`distill() plugins from config array`, () => {
    const conf = [].concat(config);
    let result = distill({}, conf, { plugins: [1] });

    expect(result).toMatchSnapshot();

    conf[0].plugins = [];
    result = distill({}, conf, { plugins: [1] });

    expect(result).toMatchSnapshot();

    conf[1].plugins = [1];
    result = distill({}, conf, { plugins: [1] });

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
