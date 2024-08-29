interface Options {
  /**
   * Exclude `module.exports.default`
   *
   * Set to `true` to exclude `module.exports.default`
   *
   * @default false
   *
   * @see https://github.com/mnrendra/rollup-plugin-mixexport#readme
   */
  excludeDefault?: boolean
}

export default Options
