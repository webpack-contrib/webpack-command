'use strict';

const chalk = require('chalk');
const advanced = require('./advanced.js');
const config = require('./config.js');
const general = require('./general.js');
const modul = require('./module.js');
const optimization = require('./optimization.js');
const output = require('./output.js');
const resolver = require('./resolver.js');

const allFlags = [
  advanced,
  config,
  general,
  modul,
  optimization,
  output,
  resolver
];

function getLongest() {
  let result = 0;

  for (const group of allFlags) {
    for (const name of Object.keys(group.flags)) {
      const flag = group.flags[name];
      const alias = flag.alias ? `, -${flag.alias}` : '';
      result = Math.max(result, name.length + alias.length);
    }
  }

  return result;
}

function getGroupHelp(flags, maxLength) {
  const result = [];

  for (const name of Object.keys(flags)) {
    const flag = flags[name];
    const alias = flag.alias ? `, -${flag.alias}` : '';
    const diff = Math.abs((name.length + alias.length) - maxLength);
    const space = Array(diff + 2).fill(' ').join('');
    let { desc } = flag;
    const leftovers = desc.substring(80).split('');

    desc = desc.substring(0, 80);

    while (leftovers.length > 0) {
      const bits = [].concat('\n', Array(maxLength + 6).fill(' '), leftovers.splice(0, 80));
      desc += bits.join('');
    }

    result.push(`  --${name}${alias}${space}${desc}`);
  }

  return result;
}

module.exports = {
  help() {
    let result = [];
    const groups = allFlags.slice(0);
    const maxLength = getLongest();
    const generalHelp = getGroupHelp(general.flags, maxLength);

    result = result.concat(generalHelp, '');
    groups.splice(2, 1);

    for (const group of groups) {
      result.push(chalk`{underline ${group.name}}`);
      result = result.concat(getGroupHelp(group.flags, maxLength), '');
    }

    return result.join('\n');
  }
};
