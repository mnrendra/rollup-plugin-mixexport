import type { Plugin as RollupPlugin } from 'rollup'

import type { buildHooks, outputGenerationHooks } from '../core'

interface Plugin extends RollupPlugin {
  name: string
  version: string
  buildStart: typeof buildHooks.buildStart
  renderChunk: typeof outputGenerationHooks.renderChunk
}

export default Plugin
