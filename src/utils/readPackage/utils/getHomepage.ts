import type { Package } from '@mnrendra/read-package'

/**
 * Get the package's homepage.
 * @param package The package's properties
 * @returns The package's homepage
 */
const getHomepage = ({ homepage }: Package): string => {
  // Get the package's homepage.
  const pluginHomepage = homepage

  // Return the package's homepage as a string.
  return pluginHomepage as string
}

export default getHomepage
