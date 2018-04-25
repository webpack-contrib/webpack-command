const { apply, build, crcDist, distContains, validate } = require('../../util');

describe('--module-bind', () => {
  const fixture = `module-bind/bind`;
  const opts = { fixture };

  let config;

  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });

  it(`should bind and build`, () =>
    build(config).then((result) => {
      expect(distContains('loader: module.exports')).toBe(true);
      expect(result).toMatchSnapshot();
      expect(crcDist()).toMatchSnapshot();
    }));
});

describe('--module-bind-pre', () => {
  const fixture = `module-bind/bind-pre`;
  const opts = { fixture };

  let config;

  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });

  it(`should bind and build`, () =>
    build(config).then((result) => {
      expect(distContains(`pre = true`)).toBe(true);
      expect(result).toMatchSnapshot();
      expect(crcDist()).toMatchSnapshot();
    }));
});

describe('--module-bind-post', () => {
  const fixture = `module-bind/bind-post`;
  const opts = { fixture };

  let config;

  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });

  it(`should bind and build`, () =>
    build(config).then((result) => {
      expect(distContains(`post = true`)).toBe(true);
      expect(result).toMatchSnapshot();
      expect(crcDist()).toMatchSnapshot();
    }));
});

describe('--module-bind-all', () => {
  const fixture = `module-bind/bind-all`;
  const opts = { fixture };

  let config;

  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });

  it(`should bind and build`, () =>
    build(config).then((result) => {
      expect(distContains('loader: module.exports')).toBe(true);
      expect(distContains(`pre = true`)).toBe(true);
      expect(distContains(`post = true`)).toBe(true);
      expect(result).toMatchSnapshot();
      expect(crcDist()).toMatchSnapshot();
    }));
});
