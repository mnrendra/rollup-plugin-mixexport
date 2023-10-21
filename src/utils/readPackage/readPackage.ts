import type { Package } from './types'

import { readPackage as readPkg } from '@mnrendra/read-package'
import { getHomepage, getName, getVersion } from './utils'

/**
 * Read `package.json` properties.
 * @returns The package's properties
 */
const readPackage = async (): Promise<Package> => {
  // Read `package.json` properties.
  const pkg = await readPkg()

  // Get the package's name.
  const name = getName(pkg)

  // Get the package's version.
  const version = getVersion(pkg)

  // Get the package's homepage.
  const homepage = getHomepage(pkg)

  // Return the package's properties.
  return {
    name,
    version,
    homepage
  }
}

export default readPackage
