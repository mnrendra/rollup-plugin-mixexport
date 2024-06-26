import type { NormalizedInputOptions, Plugin } from 'rollup'

import store from '../../store'

export type BuildStartOptions = Omit<NormalizedInputOptions, 'plugins'> & {
  plugins: Plugin | Plugin[]
}

/**
 * The Rollup `buildStart` hook.
 * Part of Rollup's Build Hooks.
 *
 * @param {object} InputOptions - Rollup `NormalizedInputOptions`.
 */
function buildStart <T extends BuildStartOptions = NormalizedInputOptions> ({
  plugins
}: T): void {
  // Throw an error if the `plugins` is not an array.
  if (!Array.isArray(plugins)) {
    throw new Error(
      '`rollup-plugin-esbuild` is required and must be invoked immediately ' +
      `before \`${store.name}\`!\nMore info: ${store.homepage}`
    )
  }

  // Get the plugin names.
  const pluginNames = plugins.map(({ name }) => name)

  // Get the preceding plugin.
  const precedingPlugin = pluginNames[pluginNames.indexOf(store.pluginName) - 1]

  // Throw an error if the `precedingPlugin` is not `esbuild`.
  if (precedingPlugin !== 'esbuild') {
    throw new Error(
      '`rollup-plugin-esbuild` is required and must be invoked immediately ' +
      `before \`${store.name}\`!\nMore info: ${store.homepage}`
    )
  }
}

// Export the `buildStart` as the default value.
export default buildStart
