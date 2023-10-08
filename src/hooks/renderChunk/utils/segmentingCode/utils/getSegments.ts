/**
 * Get the segmented codes.
 * @param code The stringed code from `Rollup`
 * @param splitter The code splitter
 * @returns The segmented codes
 */
const getSegments = (
  code: string,
  splitter: string
): string[] => {
  // Segmenting code by the splitter.
  const segments = code.split(splitter)

  // Return the segmented codes.
  return segments
}

export default getSegments
