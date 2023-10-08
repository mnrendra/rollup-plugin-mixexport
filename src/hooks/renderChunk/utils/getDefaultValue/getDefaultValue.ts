import type { RenderedChunk } from '../../types'

/**
 * Get the default value of the rendered chunk.
 * @param code The stringed code from `Rollup`
 * @returns The default value of the rendered chunk
 */
const getDefaultValue = (
  code: string
): RenderedChunk => {
  // Set the default value.
  const defaultValue = { code, map: null }

  // Return the default value.
  return defaultValue
}

export default getDefaultValue
