const { apply, build, crcDist, validate } = require('../../util');

describe('--run-dev', () => {
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

describe('--run-prod', () => {
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
