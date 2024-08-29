import type { Plugin } from 'rollup'

import type { Options } from './types'

import { initStore, printInfo } from '@mnrendra/rollup-utils'

import store from './store'

import { buildStart } from './core/buildHooks'
import { renderChunk } from './core/outputGenerationHooks'

/**
 * Rollup plugin for mixing exports.
 *
 * @returns {Promise<Plugin>} Rollup plugin object.
 */
const main = async ({
  excludeDefault = false
}: Options = {}): Promise<Plugin> => {
  // Initialize store.
  await initStore(store)
  store.excludeDefault = excludeDefault

  // Print info.
  await printInfo(store)

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

// Export the `main` as the default value.
export default main
