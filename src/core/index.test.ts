import { initStore } from '@mnrendra/rollup-utils'

import store from '../store'

import renderedChunk from '@tests/dummies/renderedChunk'
import outputOptions from '@tests/dummies/outputOptions'

import { buildHooks, outputGenerationHooks } from '.'

describe('Test `core`:', () => {
  beforeAll(async () => {
    await initStore(store)
  })

  describe('Test `buildHooks`:', () => {
    describe('Test `buildStart`:', () => {
      beforeAll(async () => {
        await initStore(store)
      })

      it('Should throw an error if `plugins` is not an array!', () => {
        const received = (): void => {
          buildHooks.buildStart({
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
          buildHooks.buildStart({
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
          buildHooks.buildStart({
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

      beforeAll(async () => {
        await initStore(store)
      })

      it('Should return the original chunk if the `format` is not "cjs" or "commonjs"!', () => {
        const received = outputGenerationHooks.renderChunk(
          '',
          renderedChunk,
          { ...outputOptions, format: 'es' },
          { chunks: {} }
        )

        const expected = defaultValue

        expect(received).toEqual(expected)
      })

      it('Should return the original chunk if there is no `exports.default` in the code!', () => {
        const received = outputGenerationHooks.renderChunk(
          '',
          renderedChunk,
          { ...outputOptions, format: 'cjs' },
          { chunks: {} }
        )

        const expected = defaultValue

        expect(received).toEqual(expected)
      })

      it('Should throw an error if the `exports.default` value is `null`!', () => {
        const received = (): void => {
          outputGenerationHooks.renderChunk(
            'var main=null;exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )
        }

        const expected = Error(
          'Failed to mix exports: "null" cannot be used as a default value. ' +
          'Only "object" and "function" are allowed.'
        )

        expect(received).toThrow(expected)
      })

      it('Should throw an error if the `exports.default` value is a `bigint`!', () => {
        const received = (): void => {
          outputGenerationHooks.renderChunk(
            'var main=0n;exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )
        }

        const expected = Error(
          'Failed to mix exports: "bigint" cannot be used as a default value. ' +
          'Only "object" and "function" are allowed.'
        )

        expect(received).toThrow(expected)
      })

      it('Should throw an error if the `exports.default` value is a `boolean`!', () => {
        const received = (): void => {
          outputGenerationHooks.renderChunk(
            'var main=false;exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )
        }

        const expected = Error(
          'Failed to mix exports: "boolean" cannot be used as a default value. ' +
          'Only "object" and "function" are allowed.'
        )

        expect(received).toThrow(expected)
      })

      it('Should throw an error if the `exports.default` value is a `number`!', () => {
        const received = (): void => {
          outputGenerationHooks.renderChunk(
            'var main=0;exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )
        }

        const expected = Error(
          'Failed to mix exports: "number" cannot be used as a default value. ' +
          'Only "object" and "function" are allowed.'
        )

        expect(received).toThrow(expected)
      })

      it('Should throw an error if the `exports.default` value is a `string`!', () => {
        const received = (): void => {
          outputGenerationHooks.renderChunk(
            'var main="";exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )
        }

        const expected = Error(
          'Failed to mix exports: "string" cannot be used as a default value. ' +
          'Only "object" and "function" are allowed.'
        )

        expect(received).toThrow(expected)
      })

      it('Should throw an error if the `exports.default` value is a `symbol`!', () => {
        const received = (): void => {
          outputGenerationHooks.renderChunk(
            'var main=Symbol("");exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )
        }

        const expected = Error(
          'Failed to mix exports: "symbol" cannot be used as a default value. ' +
          'Only "object" and "function" are allowed.'
        )

        expect(received).toThrow(expected)
      })

      it('Should return a rendered chunk with mixed exports!', () => {
        const received = outputGenerationHooks.renderChunk(
          'var main = () => "main";\nexports.main = main;\nexports.default = main;',
          renderedChunk,
          { ...outputOptions, format: 'cjs' },
          { chunks: {} }
        )

        const expected = {
          ...defaultValue,
          code: 'var main = () => "main";\nexports.main = main;\nexports.default = main;\nmodule.exports = exports.default;\nObject.defineProperties(module.exports, {\n  __esModule: { value: true },\n  main: { value: exports.main },\n  default: { value: exports.default }\n});'
        }

        expect(received).toEqual(expected)
      })

      describe('By mocking `store.minify` value to `true`:', () => {
        beforeEach(() => {
          store.minify = true
        })

        afterEach(() => {
          store.minify = false
        })

        it('Should return a rendered chunk with mixed exports in a minified format!', () => {
          const received = outputGenerationHooks.renderChunk(
            'var main=()=>"main";exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )

          const expected = {
            ...defaultValue,
            code: 'var main=()=>"main";exports.main=main;exports.default=main;module.exports=exports.default;Object.defineProperties(module.exports,{__esModule:{value:!0},main:{value:exports.main},default:{value:exports.default}});'
          }

          expect(received).toEqual(expected)
        })
      })
    })
  })
})
