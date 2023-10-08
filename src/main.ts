import type { Plugin } from 'rollup'

import { buildStart, renderChunk } from './hooks'

/**
 * Rollup plugin for mixing exports.
 * @returns Rollup plugin object
 */
const main = (): Plugin => ({
  /**
   * Rollup Plugin Properties
   */

  // Name
  name: 'mixexport',

  /**
   * Rollup Plugin Build Hooks
   */

  // Build Start
  buildStart,

  /**
   * Rollup Plugin Generation Hooks
   */

  // Render Chunk
  renderChunk
})

export default main
