import {
  getFirstSegment,
  getLastSegment,
  getSegments,
  getSplitter
} from './utils'

import {
  errorCodeIssue,
  errorSplitCode
} from './errors'

/**
 * Segmenting code.
 * @param code The stringed code from `Rollup`
 * @param firstExport The first export name
 * @returns The tuple of the first and the last code segment
 */
const segmentingCode = (
  code: string,
  firstExport: string
): [string, string] => {
  // Get the code splitter.
  const splitter = getSplitter(firstExport)

  // Get the segmented codes.
  const segments = getSegments(code, splitter)

  // Should throw an error if the number of segments is more than two!
  if (segments.length > 2) throw errorSplitCode({ segments, splitter })

  // Should throw an error if the number of segments is less than two!
  if (segments.length < 2) throw errorCodeIssue({ code, splitter })

  // Get the first code segment.
  const firstSegment = getFirstSegment(segments)

  // Get the last code segment.
  const lastSegment = getLastSegment(segments, splitter)

  // Return the tuple of the first and the last code segment.
  return [firstSegment, lastSegment]
}

export default segmentingCode
