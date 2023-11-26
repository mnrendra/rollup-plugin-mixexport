import { readPackage } from '@mnrendra/read-package'

import store from './store'

import initStore from './initStore'

describe('Test `store`.', () => {
  describe('Test `store`.', () => {
    test('Should set `name` and `pluginName` correctly!', () => {
      store.setName('@mnrendra/rollup-plugin-mixexport')
      expect(store.name).toBe('@mnrendra/rollup-plugin-mixexport')
      expect(store.pluginName).toBe('mixexport')
    })

    test('Should set `version` correctly!', () => {
      store.setVersion('0.0.0-development')
      expect(store.version).toBe('0.0.0-development')
    })

    test('Should set `homepage` correctly!', () => {
      store.setHomepage('https://github.com/mnrendra/rollup-plugin-mixexport#readme')
      expect(store.homepage).toBe('https://github.com/mnrendra/rollup-plugin-mixexport#readme')
    })
  })

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
})
