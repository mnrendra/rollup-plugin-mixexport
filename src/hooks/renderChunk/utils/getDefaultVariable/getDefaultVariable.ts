import { errorNoDefault } from './errors'

import { getMatches } from './utils'

/**
 * Get the `exports.default` variable.
 * @param lastSegment The last code segment
 * @returns The `exports.default` variable
 */
const getDefaultVariable = (
  lastSegment: string
): string => {
  // Find the `exports.default` variable.
  const matches = getMatches(lastSegment)

  // Throw an error if there is no match regex pattern!
  if (!matches?.[1]) throw errorNoDefault()

  // Return the `exports.default` variable.
  return matches[1]
}

export default getDefaultVariable
