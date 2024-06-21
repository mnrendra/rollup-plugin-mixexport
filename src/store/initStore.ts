import { readPackage } from '@mnrendra/read-package'

import store from './store'

/**
 * Initialize the store to save the expensive values once.
 */
const initStore = async (): Promise<void> => {
  // Read `package.json` as the expensive function.
  const { name, version, homepage } = await readPackage()

  // Save the package `name` to the store.
  store.setName(name)

  // Save the package `version` to the store.
  store.setVersion(version)

  // Save the package `homepage` to the store.
  store.setHomepage(homepage as string)
}

// Export the `initStore` as the default value.
export default initStore
