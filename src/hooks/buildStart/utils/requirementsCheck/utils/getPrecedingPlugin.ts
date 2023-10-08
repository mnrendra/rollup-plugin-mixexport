/**
 * Get the preceding plugin name.
 * @param pluginNames The plugin names
 * @returns The preceding plugin name
 */
const getPrecedingPlugin = (
  pluginNames: string[]
): string => {
  // Retrieve the preceding plugin.
  const precedingPlugin = pluginNames[pluginNames.indexOf('mixexport') - 1]

  // Return the preceding plugin name.
  return precedingPlugin
}

export default getPrecedingPlugin
