import type { Plugin } from 'rollup'

import { buildStart, renderChunk } from './hooks'
import { readPackage } from './utils'

/**
 * Rollup plugin for mixing exports.
 * @returns Rollup plugin object
 */
const main = async (): Promise<Plugin> => {
  // Get the package's properties.
  const { name, version } = await readPackage()

  // Return Rollup plugin object.
  return {
    /**
     * Properties
     */

    // Name
    name,

    // Version
    version,

    /**
     * Build Hooks
     */

    // Build Start
    buildStart,

    /**
     * Generation Hooks
     */

    // Render Chunk
    renderChunk
  }
}

export default main
