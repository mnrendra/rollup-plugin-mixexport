import { assembleCode, getMinifiedStatus } from './utils'

/**
 * Assemble the segmented codes.
 * @param firstSegment The first code segment
 * @param defaultVariable The `default.default` variable
 * @param lastSegment The last code segment
 * @returns The assembled code
 */
const reassembleCode = (
  firstSegment: string,
  defaultVariable: string,
  lastSegment: string
): string => {
  // Determine whether the code is minified or not.
  const isMinified = getMinifiedStatus(lastSegment)

  // If the code is minified, it should return the minified format.
  const assembledCode = assembleCode({
    firstSegment,
    lastSegment,
    defaultVariable,
    isMinified
  })

  // Retrun the assembled code.
  return assembledCode
}

export default reassembleCode
