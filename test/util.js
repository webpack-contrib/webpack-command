const decamelizeKeys = require('decamelize-keys');
const buildMinimistOptions = require('minimist-options');
const minimist = require('minimist');

const compiler = require('../lib/compiler');
const { validate } = require('../lib/flags/util');

function prep(options) {
  /* eslint-disable global-require, import/no-dynamic-require */
  const fixture = require(`./fixtures/flags/${options.fixture}`);
  const group = require(`../lib/flags/${fixture.group}`);
  const args = fixture.arguments;
  const minimistOpts = buildMinimistOptions(
    Object.assign({ arguments: 'string' }, fixture.flags)
  );

  const argv = minimist(args, minimistOpts);

  delete argv._;

  return { fixture, group, argv };
  /* eslint-enable global-require, import/no-dynamic-require */
}

module.exports = {
  apply(options) {
    const { argv, fixture, group } = prep(options);
    const { config } = fixture;
    const result = group.apply(argv, config);

    return result;
  },

  build(config) {
    return compiler(config).run();
  },

  prep,

  validate(options) {
    const { argv, group } = prep(options);

    for (const key of Object.keys(decamelizeKeys(argv))) {
      const flag = group.flags[key];

      if (flag) {
        const value = argv[key];

        if (!validate(flag, value)) {
          throw new Error(`\`${key}\` does not match type(s) \`${flag.type}\``);
        }
      }
    }

    return true;
  },
};
