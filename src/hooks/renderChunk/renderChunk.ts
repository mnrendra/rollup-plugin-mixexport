import type {
  RenderedChunk,
  NormalizedOutputOptions,
  RenderChunkHook
} from 'rollup'

import {
  getDefaultValue,
  getSkippedStatus,
  segmentingCode,
  getDefaultVariable,
  reassembleCode,
  getRenderedChunk
} from './utils'

/**
 * Rollup generation hooks.
 * @param code The stringed code from `Rollup`
 * @param chunk The rendered chunk
 * @param ouputOptions The normalized output options
 * @returns The new rendered chunk object
 */
function renderChunk (
  code: string,
  { exports }: RenderedChunk,
  { format }: NormalizedOutputOptions
): ReturnType<RenderChunkHook> {
  // Get the default value of the rendered chunk.
  const defaultValue = getDefaultValue(code)

  // Get the skipped status by filtering Rollup `format` and `exports`.
  const isSkipped = getSkippedStatus({ format, exports })

  // Should be skipped when the criteria aren't met!
  if (isSkipped) return defaultValue

  // Retrieves the code segments.
  const [firstSegment, lastSegment] = segmentingCode(code, exports[0])

  // Get the `exports.default` variable.
  const defaultVar = getDefaultVariable(lastSegment)

  // Reassemble the code segments.
  const reassembledCode = reassembleCode(firstSegment, defaultVar, lastSegment)

  // Get the rendered chunk.
  const renderedChunk = getRenderedChunk(defaultValue, reassembledCode)

  // Return rendered chunk object.
  return renderedChunk
}

export default renderChunk
