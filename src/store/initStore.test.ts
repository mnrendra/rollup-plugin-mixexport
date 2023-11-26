import { readPackage } from '@mnrendra/read-package'

import store from './store'

import initStore from './initStore'

describe('Test `initStore`.', () => {
  it('Should initialize the store with package data!', async () => {
    const packageData = await readPackage()

    await initStore()

    expect(store.name).toBe(packageData.name)
    expect(store.pluginName).toBe(packageData.name.replace('@mnrendra/rollup-plugin-', ''))
    expect(store.version).toBe(packageData.version)
    expect(store.homepage).toBe(packageData.homepage)
  })
})
