const { resolve } = require('path');

const dependencyPath = resolve(__dirname, '../../common/entry-a.js');
// eslint-disable-next-line no-unused-vars, import/no-dynamic-require
const dependency = require(`aliased!${dependencyPath}`);

module.exports = 'resolve-loader-alias-entry';
