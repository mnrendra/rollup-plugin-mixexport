interface Options {
  segments: string[]
  splitter: string
}

/**
 * New error caused by code splitter.
 * @param options Must contain `{ segments, splitter }` as an object
 * @returns New error
 */
const errorSplitCode = ({
  segments,
  splitter
}: Options): Error => {
  let message = '' +
    `It seems that there is an \`${splitter}\` in your code. ` +
    'Please consider renaming it or separating it into distinct variables. ' +
    'This keyword is used to split your code. ' +
    'Below are your splitted codes:\n'

  for (let i = 0; i < segments.length; i++) {
    message += `\nSplit ${i}:\n${segments[i]}\n`
  }

  message += '\nMore info: https://github.com/mnrendra/rollup-plugin-mixexport#readme'

  return new Error(message)
}

export default errorSplitCode
