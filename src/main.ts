import type { Plugin } from 'rollup'

import { buildStart } from './core/buildHooks'
import { renderChunk } from './core/outputGenerationHooks'

import store, { initStore } from './store'

/**
 * Rollup plugin for mixing exports.
 * @returns Rollup plugin object
 */
const main = async (): Promise<Plugin> => {
  // Initialize store.
  await initStore()

  // Return Rollup plugin object.
  return {
    /**
     * Properties
     */

    name: store.pluginName,
    version: store.version,

    /**
     * Build Hooks
     */

    buildStart,

    /**
     * Output Generation Hooks
     */

    renderChunk
  }
}

export default main
