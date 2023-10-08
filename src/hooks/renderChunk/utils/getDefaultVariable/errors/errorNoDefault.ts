/**
 * New error caused by no default variable found.
 * @returns New error
 */
const errorNoDefault = (): Error => {
  const message = '' +
    'The default variable could not be found in your code. Please ensure that ' +
    'you export a default value as a variable, avoiding anonymous functions ' +
    'or any invoked functions. ' +
    'More info: https://github.com/mnrendra/rollup-plugin-mixexport#readme'

  return new Error(message)
}

export default errorNoDefault
