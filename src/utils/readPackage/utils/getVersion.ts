import type { Package } from '@mnrendra/read-package'

/**
 * Get the package's version.
 * @param package The package's properties
 * @returns The package's version
 */
const getVersion = ({ version }: Package): string => {
  // Get the package's version.
  const pluginName = version

  // Return the package's version as a string.
  return pluginName
}

export default getVersion
