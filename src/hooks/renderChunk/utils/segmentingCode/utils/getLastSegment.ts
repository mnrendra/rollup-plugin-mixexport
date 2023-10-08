/**
 * Get the last code segment.
 * @param segments The segmented codes
 * @param splitter The code splitter
 * @returns The last code segment
 */
const getLastSegment = (
  segments: string[],
  splitter: string
): string => {
  // Define the replace pattern.
  const pattern = /(module\.)?exports\./g

  // Define the replacement value.
  const replacement = 'module.exports.'

  // Get the last code segment.
  const lastSegment = `${splitter}${segments[1]}`.replace(pattern, replacement)

  // Return the last code segment.
  return lastSegment
}

export default getLastSegment
