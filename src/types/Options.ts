/**
 * The options interface.
 *
 * @see https://github.com/mnrendra/rollup-plugin-mixexport#readme
 */
interface Options {
  /**
   * To produce the minified or pretty format.
   *
   * @default false
   */

  /**
   * To specify whether to define `exports.__esModule`.
   *
   * @default undefined
   */
  defineEsModule?: boolean
  minify?: boolean
}

export default Options
