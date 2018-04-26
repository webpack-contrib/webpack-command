<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]

# webpack-command

🔳 A proof-of-concept for a lightweight, modular webpack CLI

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `webpack-command`:

```console
$ npm install webpack-command --save-dev
```

## TODO

- docs: `teach` command, `pre` and `post` install, `--forget`
- docs: writing commands
- docs: `webpack file.js file2.js` input must be existing file/directory, `entry: { cli: [ ... ]}`
- docs: `webpack --entry file --entry file2`
- docs: `webpack --entry.name file --entry.name file2`
- docs: `--resolve-alias.jquery jquery.plugin`
- docs: `--resolve-loader-alias.catalog catalog/lib/loader`
- docs: --entry overridden by default : https://github.com/webpack/webpack-cli/pull/358

## Bennies

- will validate all flag types first
- will catch misspelled flags

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

#### [CONTRIBUTING](./.github/CONTRIBUTING)

## License

#### [MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/webpack-command.svg
[npm-url]: https://npmjs.com/package/webpack-command

[node]: https://img.shields.io/node/v/webpack-command.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/webpack-command.svg
[deps-url]: https://david-dm.org/webpack-contrib/webpack-command

[tests]: 	https://img.shields.io/circleci/project/github/webpack-contrib/webpack-command.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/webpack-command

[cover]: https://codecov.io/gh/webpack-contrib/webpack-command/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/webpack-command

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack