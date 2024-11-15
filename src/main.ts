import type { Options, Plugin } from './types'

import { initStore, printInfo } from '@mnrendra/rollup-utils'

import store from './store'

import { buildHooks, outputGenerationHooks } from './core'

/**
 * 🍣 A [Rollup](https://rollupjs.org/) plugin to mix **CommonJS** exports. So,
 * the consumers of your bundle will not have to use **chunk** `.default` to
 * access their default export.
 *
 * @param {Options} options - The options object.
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
  store.defineEsModule = defineEsModule
  store.minify = minify

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

export default main
