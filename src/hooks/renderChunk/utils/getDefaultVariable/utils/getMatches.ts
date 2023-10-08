/**
 * Get the matches of the `export.default` variable.
 * @param lastSegment The last code segment
 * @returns The matches of the `export.default` variable
 */
const getMatches = (
  lastSegment: string
): RegExpMatchArray | null => {
  // Define match pattern.
  const pattern = /exports\.default\s*=\s*([^,;]+)/

  // Find the `exports.default` variable by matching the pattern.
  const matches = lastSegment.match(pattern)

  // Return the matches of the `export.default` variable.
  return matches
}

export default getMatches
