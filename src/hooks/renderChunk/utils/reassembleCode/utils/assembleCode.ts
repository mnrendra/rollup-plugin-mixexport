interface Options {
  firstSegment: string
  lastSegment: string
  defaultVariable: string
  isMinified: boolean
}

/**
 * Assemble the code.
 * @param firstSegment The first code segment
 * @param lastSegment The last code segment
 * @param defaultVariable The default variable
 * @param isMinified The minified status
 * @returns The assembled code
 */
const assembleCode = ({
  firstSegment,
  lastSegment,
  defaultVariable,
  isMinified
}: Options): string => {
  // Assamble code based on the minified status.
  const assembledCode = isMinified
    ? `${firstSegment}module.exports=${defaultVariable},${lastSegment}`
    : `${firstSegment}module.exports = ${defaultVariable};\n${lastSegment}`

  // Return the assembled code.
  return assembledCode
}

export default assembleCode
