import { inputOptions } from '@tests/stubs'

import store, { initStore } from '../../store'

import buildStart from './buildStart'

describe('Test `buildStart`.', () => {
  beforeAll(async () => {
    await initStore()
  })

  it('Should throw an error if the `plugins` is not an array!', () => {
    const received = (): void => {
      buildStart({
        ...inputOptions,
        plugins: { name: '' }
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
        ...inputOptions,
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
        ...inputOptions,
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
