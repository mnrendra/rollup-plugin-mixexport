/**
 * Get the code splitter.
 * @param firstExport The first export name
 * @returns The code splitter
 */
const getSplitter = (
  firstExport: string
): string => {
  // Define the code splitter.
  const splitter = `exports.${firstExport}`

  // Return the code splitter.
  return splitter
}

export default getSplitter
