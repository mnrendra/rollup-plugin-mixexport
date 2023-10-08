import type { SourceMapInput } from 'rollup'

interface RenderedChunk {
  code: string
  map: SourceMapInput | undefined
}

export default RenderedChunk
