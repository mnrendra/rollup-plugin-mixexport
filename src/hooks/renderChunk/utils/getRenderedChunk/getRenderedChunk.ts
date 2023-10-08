import type { RenderChunkHook } from 'rollup'
import type { RenderedChunk } from '../../types'

/**
 * Get the rendered chunk.
 * @param defaultValue The default value of the rendered chunk
 * @param reassembledCode The reassembled code
 * @returns The rendered chunk
 */
const getRenderedChunk = (
  defaultValue: RenderedChunk,
  reassembledCode: string
): ReturnType<RenderChunkHook> => {
  // Set the rendered chunk.
  const renderedChunk = {
    ...defaultValue,
    code: reassembledCode
  }

  // Return the rendered chunk.
  return renderedChunk
}

export default getRenderedChunk
