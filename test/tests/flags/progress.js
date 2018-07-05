const { apply, test, validate } = require('../../util');

const fixture = 'progress/progress';
const opts = { fixture };

let config;

test('--progress', module, () => {
  it(`should validate`, () => {
    expect(validate(opts)).toEqual(true);
  });

  it(`should apply`, () => {
    config = apply(opts);

    expect(config).toMatchSnapshot();
  });
});
