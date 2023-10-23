import { readPackage } from '@mnrendra/read-package'

import store from './store'

/**
 * Initialize the store to save the expensive values once.
 */
const initStore = async (): Promise<void> => {
  // Read `package.json` as the expensive function.
  const { name, version, homepage } = await readPackage()

  // Save package `name` to the store.
  store.setName(name)

  // Save package `version` to the store.
  store.setVersion(version)

  // Save package `homepage` to the store.
  store.setHomepage(homepage as string)
}

export default initStore
