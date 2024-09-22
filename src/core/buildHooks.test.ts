import { initStore } from '@mnrendra/rollup-utils'

import store from '../store'

import { buildStart } from './buildHooks'

describe('Test `buildHooks`:', () => {
  describe('Test `buildStart`:', () => {
    beforeAll(async () => {
      await initStore(store)
    })

    it('Should throw an error if `plugins` is not an array!', () => {
      const received = (): void => {
        buildStart({
          plugins: { name: '' }
        })
      }

      const expected = Error(
        '`rollup-plugin-esbuild` is required and must be invoked immediately ' +
        `before \`${store.name}\`!\nMore info: ${store.homepage}`
      )

      expect(received).toThrow(expected)
    })

    it('Should throw an error if `plugins` is an array but contains invalid elements!', () => {
      const received = (): void => {
        buildStart({
          plugins: [null]
        })
      }

      const expected = Error(
        '`rollup-plugin-esbuild` is required and must be invoked immediately ' +
        `before \`${store.name}\`!\nMore info: ${store.homepage}`
      )

      expect(received).toThrow(expected)
    })

    it('Should not throw an error if the preceding plugin is "esbuild"!', () => {
      const received = (): void => {
        buildStart({
          plugins: [
            { name: 'esbuild' },
            { name: 'mixexport' }
          ]
        })
      }

      const expected = Error

      expect(received).not.toThrow(expected)
    })

    it('Should throw an error if the preceding plugin is not "esbuild"!', () => {
      const received = (): void => {
        buildStart({
          plugins: [
            { name: 'mixexport' }
          ]
        })
      }

      const expected = Error(
        '`rollup-plugin-esbuild` is required and must be invoked immediately ' +
        `before \`${store.name}\`!\nMore info: ${store.homepage}`
      )

      expect(received).toThrow(expected)
    })
  })
})
