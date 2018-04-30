/** @typedef {import("webpack/lib/Compiler")} Compiler */
/**
 * @typedef {Object} ReporterOptions
 * @property {Compiler} ReporterOptions.compiler webpack compiler instance
 * @property {Object} ReporterOptions.config webpack configuration object
 */

module.exports = class Reporter {
  /**
   * @constructor
   * @abstract
   * @param {ReporterOptions} options
   */
  constructor(options) {
    this.compiler = options.compiler;
    this.config = options.config;
  }

  /**
   * @method render
   * @param {Error} error An Error object
   * @param {Object} stats A webpack stats object https://webpack.js.org/api/node/#stats-object
   */

  render(error, stats) {} // eslint-disable-line no-unused-vars
};
