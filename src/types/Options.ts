/**
 * `rollup-plugin-mixexport` options interface.
 *
 * @see https://github.com/mnrendra/rollup-plugin-mixexport#readme
 */
interface Options {
  /**
   * To specify whether to define `exports.__esModule`.
   *
   * @default undefined
   */
  defineEsModule?: boolean

  /**
   * To produce the minified or pretty format.
   *
   * @default false
   */
  minify?: boolean
}

export default Options
