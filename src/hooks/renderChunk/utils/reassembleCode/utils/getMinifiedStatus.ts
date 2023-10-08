/**
 * Get the minified status.
 * @param lastSegment The last code segment
 * @returns The minified status
 */
const getMinifiedStatus = (lastSegment: string): boolean => {
  // Determine whether the code is minified or not.
  const isMinified = !lastSegment.includes(' = ')

  // Return the minified status.
  return isMinified
}

export default getMinifiedStatus
