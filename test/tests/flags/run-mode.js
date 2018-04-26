const { apply, build, crcDist, test, validate } = require('../../util');

test('--run-dev', module, () => {
  const fixture = 'run-mode/run-dev';
  const opts = { fixture };

  let config;

  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });

  it(`should build`, () =>
    build(config).then((result) => {
      expect(result).toMatchSnapshot();
      expect(crcDist()).toMatchSnapshot();
    }));
});

test('--run-prod', module, () => {
  const fixture = 'run-mode/run-prod';
  const opts = { fixture };

  let config;

  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });

  it(`should build`, () =>
    build(config).then((result) => {
      expect(result).toMatchSnapshot();
      expect(crcDist()).toMatchSnapshot();
    }));
});
