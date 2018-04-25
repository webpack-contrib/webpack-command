const { readFileSync: read } = require('fs');
const { join } = require('path');

const camelcaseKeys = require('camelcase-keys');
const { crc32 } = require('crc');
const decamel = require('decamelize');
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

  let argv = minimist(args, minimistOpts);
  argv = camelcaseKeys(argv, { exclude: ['--', /^\w$/] });

  delete argv._;

  return { argv, fixture, group };
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

  crcDist(filePath) {
    const readPath = filePath || join(__dirname, '../dist/main.js');
    const content = read(readPath, 'utf-8');

    return crc32(content).toString(16);
  },

  distContains(what) {
    const content = read(join(__dirname, '../dist/main.js'), 'utf-8');

    if (what instanceof RegExp) {
      return what.test(content);
    }

    return content.indexOf(what) >= 0;
  },

  prep,

  validate(options) {
    const { argv, group } = prep(options);

    for (const key of Object.keys(argv)) {
      const arg = decamel(key, '-');
      const flag = group.flags[arg];

      if (flag) {
        const value = argv[key];

        if (!validate(flag, value)) {
          throw new Error(
            `\`--${key}\` does not match type(s) \`${flag.type}\``
          );
        }
      }
    }

    return true;
  },
};
