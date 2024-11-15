import type { InputOptions } from 'rollup'

import store from '../store'

/**
 * Rollup `buildStart` hook.
 *
 * *Part of Rollup's Build Hooks.*
 *
 * @param {InputOptions} options - Rollup `InputOptions`.
 *
 * @see https://rollupjs.org/plugin-development/#buildstart
 */
export const buildStart = ({
  plugins
}: InputOptions): void => {
  // Generate error message.
  const errorMessage = ({
    name,
    homepage
  }: typeof store): Error => {
    return new Error(
      '"rollup-plugin-esbuild" or "@mnrendra/rollup-plugin-alias" is required and must be invoked immediately ' +
      `before "${name}"!\nMore info: ${homepage}`
    )
  }

  // Throw an error if the `plugins` is not an array.
  if (!Array.isArray(plugins)) {
    throw errorMessage(store)
  }

  // // Get the plugin names.
  const pluginNames = plugins.map((plugin) =>
    typeof plugin === 'object' &&
    plugin !== null &&
    !Array.isArray(plugin) &&
    !(plugin instanceof Promise)
      ? plugin.name
      : undefined)

  // Get the preceding plugin.
  const precedingPlugin = pluginNames[pluginNames.indexOf(store.pluginName) - 1]

  // Throw an error if the `precedingPlugin` is not `esbuild`.
  if (!(precedingPlugin === 'esbuild' || precedingPlugin === 'alias')) {
    throw errorMessage(store)
  }
}
