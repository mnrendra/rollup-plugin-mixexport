import type { Package } from '@mnrendra/read-package'

/**
 * Get the package's name.
 * @param package The package's properties
 * @returns The package's name
 */
const getName = ({ name }: Package): string => {
  // Get the package's name by replacing the prefix.
  const pluginName = name.replace('@mnrendra/rollup-plugin-', '')

  // Return the package's name as a string.
  return pluginName
}

export default getName
