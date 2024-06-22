import { initStore } from '@mnrendra/rollup-utils'

import store from '../store'

import inputOptions from '@tests/stubs/inputOptions'
import renderedChunk from '@tests/stubs/renderedChunk'
import outputOptions from '@tests/stubs/outputOptions'

import { buildHooks, outputGenerationHooks } from '.'

describe('Test `core`:', () => {
  beforeAll(async () => {
    await initStore(store)
  })

  describe('Test `buildHooks`:', () => {
    describe('Test `buildStart`:', () => {
      it('Should throw an error if the `plugins` is not an array!', () => {
        const received = (): void => {
          buildHooks.buildStart({
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
          buildHooks.buildStart({
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
          buildHooks.buildStart({
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
  })

  describe('Test `outputGenerationHooks`:', () => {
    describe('Test `renderChunk`:', () => {
      const defaultValue = { code: '', map: null }

      it('Should return the original chunk if the `format` is not "cjs" or "commonjs"!', () => {
        const received = outputGenerationHooks.renderChunk(
          '',
          { ...renderedChunk, exports: [] },
          { ...outputOptions, format: 'es' }
        )

        const expected = defaultValue

        expect(received).toEqual(expected)
      })

      it('Should return the original chunk if the `exports` length is less than two!', () => {
        const received = outputGenerationHooks.renderChunk(
          '',
          { ...renderedChunk, exports: [] },
          { ...outputOptions, format: 'cjs' }
        )

        const expected = defaultValue

        expect(received).toEqual(expected)
      })

      it('Should return the original chunk if the `exports` doesn\'t include "default"!', () => {
        const received = outputGenerationHooks.renderChunk(
          '',
          { ...renderedChunk, exports: ['', ''] },
          { ...outputOptions, format: 'cjs' }
        )

        const expected = defaultValue

        expect(received).toEqual(expected)
      })

      it('Should throw an error if the segment code is more than two!', () => {
        const received = (): void => {
          outputGenerationHooks.renderChunk(
            'exports.main = main;\nexports.default = main;\nexports.main = main;',
            { ...renderedChunk, exports: ['main', 'default'] },
            { ...outputOptions, format: 'cjs' }
          )
        }

        const expected = Error

        expect(received).toThrow(expected)
      })

      it('Should throw an error if the segment code is less than two!', () => {
        const received = (): void => {
          outputGenerationHooks.renderChunk(
            'exports.default = main;',
            { ...renderedChunk, exports: ['main', 'default'] },
            { ...outputOptions, format: 'cjs' }
          )
        }

        const expected = Error

        expect(received).toThrow(expected)
      })

      it('Should throw an error if the default variable can\'t be found!', () => {
        const received = (): void => {
          outputGenerationHooks.renderChunk(
            'exports.main = main;',
            { ...renderedChunk, exports: ['main', 'default'] },
            { ...outputOptions, format: 'cjs' }
          )
        }
        const expected = Error

        expect(received).toThrow(expected)
      })

      it('Should return rendered chunk with mixing exports in un-minified format!', () => {
        const received = outputGenerationHooks.renderChunk(
          'exports.main = main;\nexports.default = main;',
          { ...renderedChunk, exports: ['main', 'default'] },
          { ...outputOptions, format: 'cjs' }
        )

        const expected = {
          ...defaultValue,
          code: 'module.exports = main;\nmodule.exports.main = main;\nmodule.exports.default = main;'
        }

        expect(received).toEqual(expected)
      })

      it('Should return rendered chunk with mixing exports in minified format!', () => {
        const received = outputGenerationHooks.renderChunk(
          'exports.main=main;exports.default=main;',
          { ...renderedChunk, exports: ['main', 'default'] },
          { ...outputOptions, format: 'cjs' }
        )

        const expected = {
          ...defaultValue,
          code: 'module.exports=main,module.exports.main=main;module.exports.default=main;'
        }

        expect(received).toEqual(expected)
      })
    })
  })
})
