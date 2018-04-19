module.exports = class Reporter {
  /**
   * @constructor
   * @param compiler  {Object}  A webpack Compiler instance https://webpack.js.org/api/node/#compiler-instance
   */
  // eslint-disable-next-line no-unused-vars
  constructor(options) {
    this.compiler = options.compiler;
  }

  /**
   * @method render
   * @param error  {Error}   An Error object
   * @param stats  {Object}  A webpack stats object https://webpack.js.org/api/node/#stats-object
   */
  // eslint-disable-next-line no-unused-vars
  render(error, stats) {}
};
