interface Options {
  code: string
  splitter: string
}

/**
 * New error caused by code issue.
 * @param options Must contain `{ code, splitter }` as an object
 * @returns New error
 */
const errorCodeIssue = ({
  code,
  splitter
}: Options): Error => {
  const message = '' +
    'There is an issue in your code. ' +
    `It should not exclusively consist of an \`${splitter}\` ` +
    `at the end of your code! Below is your code:\n\n${code}\n\n` +
    'More info: https://github.com/mnrendra/rollup-plugin-mixexport#readme'

  return new Error(message)
}

export default errorCodeIssue
