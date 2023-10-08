import type { Plugin } from 'rollup'

/**
 * Get the plugin names.
 * @param plugins The `Rollup` plugins
 * @returns The array of plugin names
 */
const getPluginNames = (
  plugins: Plugin[]
): string[] => {
  // Retrieves all plugin names.
  const pluginNames = plugins.map(({ name }) => name)

  // Return plugin names.
  return pluginNames
}

export default getPluginNames
