import type {
  RenderedChunk,
  NormalizedOutputOptions,
  SourceMapInput
} from 'rollup'

import mixexports from '@mnrendra/mixexports'

import store from '../store'

/**
 * The Rollup `renderChunk` hook.
 *
 * Part of Rollup's Output Generation Hooks.
 *
 * @param {string} code - The stringed code from `Rollup`.
 * @param {RenderedChunk} chunk - The rendered chunk.
 * @param {NormalizedOutputOptions} ouputOptions - The normalized outputOptions.
 * @param {{ chunks: Record<string, RenderedChunk> }} meta - The meta of chunk.
 *
 * @returns {object} The new rendered chunk object.
 */
export const renderChunk = (
  code: string,
  chunk: RenderedChunk,
  { format }: NormalizedOutputOptions,
  meta: { chunks: Record<string, RenderedChunk> }
): { code: string, map?: SourceMapInput } | string | null => {
  // Skip to mixed exports if the format is not 'cjs'.
  if (format !== 'cjs') {
    return { code, map: null }
  }

  // Mix exports
  const newCode = mixexports(code, { minify: store.minify })

  // Return the new rendered chunk object.
  return { code: newCode, map: null }
}
