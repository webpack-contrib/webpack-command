const {
  apply,
  build,
  crcDist,
  distContains,
  test,
  validate,
} = require('../../util');

test('--module-bind', module, () => {
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

test('--module-bind-pre', module, () => {
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

test('--module-bind-post', module, () => {
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

test('--module-bind-all', module, () => {
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
      expect(distContains(`pre = true`)).toBe(true);
      expect(distContains(`post = true`)).toBe(true);
      expect(result).toMatchSnapshot();
      expect(crcDist()).toMatchSnapshot();
    }));
});
