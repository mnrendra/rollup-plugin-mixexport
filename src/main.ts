import type { Plugin as RollupPlugin } from 'rollup'

import type { Options } from './types'

import { initStore, printInfo } from '@mnrendra/rollup-utils'

import store from './store'

import { buildHooks, outputGenerationHooks } from './core'

interface Plugin extends RollupPlugin {
  name: string
  version: string
  buildStart: typeof buildHooks.buildStart
  renderChunk: typeof outputGenerationHooks.renderChunk
}

/**
 * Rollup plugin for mixing exports.
 *
 * @returns {Promise<Plugin>} Rollup plugin object.
 *
 * @see https://www.npmjs.com/package/@mnrendra/rollup-plugin-mixexport
 */
const main = async ({
  defineEsModule,
  minify = false
}: Options = {}): Promise<Plugin> => {
  // Initialize store.
  await initStore(store)

  // Store options.
  store.minify = minify
  store.defineEsModule = defineEsModule

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

    buildStart: buildHooks.buildStart,

    /**
     * Output Generation Hooks
     */

    renderChunk: outputGenerationHooks.renderChunk
  }
}

// Export the `main` as the default value.
export default main
