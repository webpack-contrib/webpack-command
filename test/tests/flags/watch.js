const { apply, test, validate } = require('../../util');

test('--watch', module, () => {
  const fixture = 'watch/single-flag';
  const opts = { fixture };

  let config;

  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });
});

test('--watch-aggregate-timeout', module, () => {
  const fixture = 'watch/watch-aggregate-timeout';
  const opts = { fixture };

  let config;

  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });
});

test('--watch-poll', module, () => {
  const fixture = 'watch/watch-poll';
  const opts = { fixture };

  let config;

  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });
});

test('--watch-stdin', module, () => {
  const fixture = 'watch/watch-stdin';
  const opts = { fixture };

  let config;

  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });
});
