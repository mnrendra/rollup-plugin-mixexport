import type {
  RenderedChunk,
  NormalizedOutputOptions,
  SourceMapInput
} from 'rollup'

import mixexports from '@mnrendra/mixexports'

import store from '../store'

/**
 * Rollup `renderChunk` hook.
 *
 * *Part of Rollup's Output Generation Hooks.*
 *
 * @param {string} code - Stringed code from `Rollup`.
 * @param {RenderedChunk} chunk - Rendered chunk.
 * @param {NormalizedOutputOptions} ouputOptions - Normalized `outputOptions`.
 * @param {{ chunks: Record<string, RenderedChunk> }} meta - Meta of chunk.
 *
 * @returns {{ code: string, map?: SourceMapInput }} Rendered chunk object.
 *
 * @see https://rollupjs.org/plugin-development/#renderchunk
 */
export const renderChunk = async (
  code: string,
  chunk: RenderedChunk,
  { format }: NormalizedOutputOptions,
  meta: { chunks: Record<string, RenderedChunk> }
): Promise<{ code: string, map?: SourceMapInput }> => {
  // Skip to mixed exports if the format is not 'cjs'.
  if (format !== 'cjs') {
    return { code, map: null }
  }

  // Mix exports
  const newCode = await mixexports(code, {
    minify: store.minify,
    defineEsModule: store.defineEsModule
  })

  // Return the new rendered chunk object.
  return { code: newCode, map: null }
}
