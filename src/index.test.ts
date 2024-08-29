import type { Plugin, RenderedChunk, NormalizedOutputOptions, RenderChunkHook } from 'rollup'

import type { BuildStartOptions } from './core/buildHooks/buildStart'

import inputOptions from '@tests/stubs/inputOptions'
import renderedChunk from '@tests/stubs/renderedChunk'
import outputOptions from '@tests/stubs/outputOptions'

import store from './store'

import index from '.'

describe('Test all features:', () => {
  let log: jest.SpyInstance

  let received: Plugin = { name: '' }

  beforeAll(async () => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {})

    received = await index()
  })

  afterAll(() => {
    log.mockRestore()
  })

  describe('Test the `name` property:', () => {
    it('Should be the same as the `store.pluginName` value!', () => {
      expect(received.name).toBe(store.pluginName)
    })
  })

  describe('Test the `version` property:', () => {
    it('Should be the same as the `store.version` value!', () => {
      expect(received.version).toBe(store.version)
    })
  })

  describe('Test the `buildStart` property:', () => {
    type BuildStart = (options: BuildStartOptions) => void

    it('Should be a function!', () => {
      const buildStart = received.buildStart as BuildStart
      expect(buildStart).toBeInstanceOf(Function)
    })

    it('Should throw an error if the `plugins` param is not an array!', () => {
      const buildStart = received.buildStart as BuildStart
      expect(() => {
        buildStart({
          ...inputOptions,
          plugins: { name: '' }
        })
      }).toThrow(Error(
        '`rollup-plugin-esbuild` is required and must be invoked immediately ' +
        `before \`${store.name}\`!\nMore info: ${store.homepage}`
      ))
    })

    it('Should throw an error if the preceding plugin is not "esbuild"!', () => {
      const buildStart = received.buildStart as BuildStart
      expect(() => {
        buildStart({
          ...inputOptions,
          plugins: [
            { name: 'mixexport' }
          ]
        })
      }).toThrow(Error(
        '`rollup-plugin-esbuild` is required and must be invoked immediately ' +
        `before \`${store.name}\`!\nMore info: ${store.homepage}`
      ))
    })

    it('Should not throw an error if the preceding plugin is "esbuild"!', () => {
      const buildStart = received.buildStart as BuildStart
      expect(() => {
        buildStart({
          ...inputOptions,
          plugins: [
            { name: 'esbuild' },
            { name: 'mixexport' }
          ]
        })
      }).not.toThrow(Error)
    })
  })

  describe('Test the `renderChunk` property:', () => {
    type RenderChunk = (
      code: string,
      chunk: RenderedChunk,
      options: NormalizedOutputOptions
    ) => ReturnType<RenderChunkHook>

    const defaultValue = { code: '', map: null }

    it('Should be a function!', () => {
      const renderChunk = received.renderChunk as RenderChunk
      expect(renderChunk).toBeInstanceOf(Function)
    })

    it('Should return the original chunk if the `format` is not "cjs" or "commonjs"!', () => {
      const renderChunk = received.renderChunk as RenderChunk
      expect(renderChunk(
        '',
        { ...renderedChunk, exports: [] },
        { ...outputOptions, format: 'es' }
      )).toEqual(defaultValue)
    })

    it('Should return the original chunk if the `exports` length is less than two!', () => {
      const renderChunk = received.renderChunk as RenderChunk
      expect(renderChunk(
        '',
        { ...renderedChunk, exports: [] },
        { ...outputOptions, format: 'cjs' }
      )).toEqual(defaultValue)
    })

    it('Should return the original chunk if the `exports` doesn\'t include "default"!', () => {
      const renderChunk = received.renderChunk as RenderChunk
      expect(renderChunk(
        '',
        { ...renderedChunk, exports: ['', ''] },
        { ...outputOptions, format: 'cjs' }
      )).toEqual(defaultValue)
    })

    it('Should throw an error if the segment code is more than two!', () => {
      const renderChunk = received.renderChunk as RenderChunk
      expect(() => {
        renderChunk(
          'exports.main = main;\nexports.default = main;\nexports.main = main;',
          { ...renderedChunk, exports: ['main', 'default'] },
          { ...outputOptions, format: 'cjs' }
        )
      }).toThrow(Error)
    })

    it('Should throw an error if the segment code is less than two!', () => {
      const renderChunk = received.renderChunk as RenderChunk
      expect(() => {
        renderChunk(
          'exports.default = main;',
          { ...renderedChunk, exports: ['main', 'default'] },
          { ...outputOptions, format: 'cjs' }
        )
      }).toThrow(Error)
    })

    it('Should throw an error if the default variable can\'t be found!', () => {
      const renderChunk = received.renderChunk as RenderChunk
      expect(() => {
        renderChunk(
          'exports.main = main;',
          { ...renderedChunk, exports: ['main', 'default'] },
          { ...outputOptions, format: 'cjs' }
        )
      }).toThrow(Error)
    })

    it('Should return rendered chunk with mixing exports in un-minified format!', () => {
      const renderChunk = received.renderChunk as RenderChunk
      expect(renderChunk(
        'exports.main = main;\nexports.default = main;',
        { ...renderedChunk, exports: ['main', 'default'] },
        { ...outputOptions, format: 'cjs' }
      )).toEqual({
        ...defaultValue,
        code: 'module.exports = main;\nmodule.exports.main = main;\nmodule.exports.default = main;'
      })
    })

    it('Should return rendered chunk with mixing exports in minified format!', () => {
      const renderChunk = received.renderChunk as RenderChunk
      expect(renderChunk(
        'exports.main=main;exports.default=main;',
        { ...renderedChunk, exports: ['main', 'default'] },
        { ...outputOptions, format: 'cjs' }
      )).toEqual({
        ...defaultValue,
        code: 'module.exports=main,module.exports.main=main;module.exports.default=main;'
      })
    })

    describe('By mocking `store.excludeDefault` value to `true`:', () => {
      beforeEach(() => {
        store.excludeDefault = true
      })

      afterEach(() => {
        delete store.excludeDefault
      })

      it('Should return rendered chunk with mixing exports and exclude `default` in un-minified format!', () => {
        const renderChunk = received.renderChunk as RenderChunk

        const expected = {
          ...defaultValue,
          code: 'module.exports = main;\nmodule.exports.main = main;'
        }

        expect(renderChunk(
          'exports.main = main;\nexports.default = main;',
          { ...renderedChunk, exports: ['main', 'default'] },
          { ...outputOptions, format: 'cjs' }
        )).toEqual(expected)
      })

      it('Should return rendered chunk with mixing exports and exclude `default` in minified format!', () => {
        const renderChunk = received.renderChunk as RenderChunk

        const expected = {
          ...defaultValue,
          code: 'module.exports=main,module.exports.main=main;'
        }

        expect(renderChunk(
          'exports.main=main;exports.default=main;',
          { ...renderedChunk, exports: ['main', 'default'] },
          { ...outputOptions, format: 'cjs' }
        )).toEqual(expected)
      })
    })
  })
})
