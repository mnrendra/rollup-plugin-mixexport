import type {
  RenderedChunk,
  NormalizedOutputOptions,
  RenderChunkHook,
  ModuleFormat
} from 'rollup'

import store from '../../store'

/**
 * The Rollup `renderChunk` hook.
 * Part of Rollup's Output Generation Hooks.
 *
 * @param {string} code - The stringed code from `Rollup`.
 * @param {object} chunk - The rendered chunk.
 * @param {object} ouputOptions - The normalized output options.
 *
 * @returns {object} The new rendered chunk object.
 */
function renderChunk (
  code: string,
  { exports }: RenderedChunk,
  { format }: NormalizedOutputOptions
): ReturnType<RenderChunkHook> {
  // Return the default value if criteria aren't met.
  if (!(
    (format === 'cjs' || (format as ModuleFormat) === 'commonjs') &&
    exports.length > 1 &&
    exports.includes('default')
  )) return { code, map: null }

  // Define the splitter.
  const splitter = `exports.${exports[0]}`

  // Segmenting codes by the splitter.
  const segments = code.split(splitter)

  // Throw an error if the segment length is more than two.
  if (segments.length > 2) {
    let message = '' +
      `It seems that there are \`${splitter}\`s in your code.\n` +
      'Please consider renaming it or separating it into distinct ' +
      'variables.\nThis keyword is used to split your code.\n' +
      'Below are your splitted codes:\n'

    for (let i = 0; i < segments.length; i++) {
      message += `\nSplit ${i}:\n${segments[i]}\n`
    }

    message += `\nMore info: ${store.homepage}`

    throw new Error(message)
  }

  // Throw an error if the segment length is less than two.
  if (segments.length < 2) {
    throw new Error(
      'There is an issue in your code!\n' +
      `It should not exclusively consist of an \`${splitter}\` ` +
      `at the end of your code! Below is your code:\n\n${code}\n\n` +
      `More info: ${store.homepage}`
    )
  }

  // Get the first segment.
  const firstSegment = segments[0]

  // Get the last segment.
  const lastSegment = `${splitter}${segments[1]}`
    .replace(/(module\.)?exports\./g, 'module.exports.')

  // Find the default variable.
  const matches = lastSegment.match(/exports\.default\s*=\s*([^,;]+)/)

  // Throw an error if the default variable couldn't be found.
  if (!matches?.[1]) {
    throw new Error(
      'The default variable could not be found in your code.\nPlease ensure ' +
      'that you export a default value as a variable, avoiding anonymous ' +
      'functions or any invoked functions!\n' +
      `More info: ${store.homepage}`
    )
  }

  // Get the default variable.
  const defaultVar = matches[1]

  const endSegment = store.excludeDefault === true
    ? lastSegment.replace(/([,;])\s*(module\.)?exports\.default\s*=\s*([^,;]+)/, '')
    : lastSegment

  // Reassemble the segmented codes.
  const reassembledCode = !endSegment.includes(' = ')
    ? `${firstSegment}module.exports=${defaultVar},${endSegment}`
    : `${firstSegment}module.exports = ${defaultVar};\n${endSegment}`

  // Return the new rendered chunk object.
  return {
    code: reassembledCode,
    map: null
  }
}

// Export the `renderChunk` as the default value.
export default renderChunk
