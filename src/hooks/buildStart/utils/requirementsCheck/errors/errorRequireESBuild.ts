/**
 * New error caused by missing `esbuild` plugin.
 * @returns New error
 */
const errorRequireESBuild = (): Error => {
  const message = '' +
    '`rollup-plugin-esbuild` is required and must be invoked immediately ' +
    'before `@mnrendra/rollup-plugin-mixexport`! ' +
    'More info: https://github.com/mnrendra/rollup-plugin-mixexport#readme'

  return new Error(message)
}

export default errorRequireESBuild
