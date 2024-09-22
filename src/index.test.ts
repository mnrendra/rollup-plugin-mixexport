import renderedChunk from '@tests/dummies/renderedChunk'
import outputOptions from '@tests/dummies/outputOptions'

import store from './store'

import index from '.'

describe('Test main feature:', () => {
  let log: jest.SpyInstance

  beforeAll(async () => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterAll(() => {
    log.mockRestore()
  })

  describe('Test plugin "Properties":', () => {
    it('Should has a `name` property, where the value is this plugin name!', async () => {
      const received = await index()
      expect(received.name).toBe(store.pluginName)
    })

    it('Should has a `version` property, where the value is this plugin version!', async () => {
      const received = await index()
      expect(received.version).toBe(store.version)
    })
  })

  describe('Test plugin "build Hooks":', () => {
    describe('Test `buildStart` hook:', () => {
      it('Should be a function!', async () => {
        const received = await index()
        expect(received.buildStart).toBeInstanceOf(Function)
      })

      it('Should throw an error if the `plugins` param is not an array!', async () => {
        const received = await index()
        expect(() => {
          received.buildStart({
            plugins: { name: '' }
          })
        }).toThrow(Error(
          '`rollup-plugin-esbuild` is required and must be invoked immediately ' +
          `before \`${store.name}\`!\nMore info: ${store.homepage}`
        ))
      })

      it('Should throw an error if `plugins` is an array but contains invalid elements!', async () => {
        const received = await index()
        expect(() => {
          received.buildStart({
            plugins: [null]
          })
        }).toThrow(Error(
          '`rollup-plugin-esbuild` is required and must be invoked immediately ' +
          `before \`${store.name}\`!\nMore info: ${store.homepage}`
        ))
      })

      it('Should throw an error if the preceding plugin is not "esbuild"!', async () => {
        const received = await index()
        expect(() => {
          received.buildStart({
            plugins: [
              { name: 'mixexport' }
            ]
          })
        }).toThrow(Error(
          '`rollup-plugin-esbuild` is required and must be invoked immediately ' +
          `before \`${store.name}\`!\nMore info: ${store.homepage}`
        ))
      })

      it('Should not throw an error if the preceding plugin is "esbuild"!', async () => {
        const received = await index()
        expect(() => {
          received.buildStart({
            plugins: [
              { name: 'esbuild' },
              { name: 'mixexport' }
            ]
          })
        }).not.toThrow(Error)
      })
    })
  })

  describe('Test plugin "Output Generation Hooks":', () => {
    describe('Test `renderChunk` hook:', () => {
      const defaultValue = { code: '', map: null }

      it('Should be a function!', async () => {
        const received = await index()
        expect(received.renderChunk).toBeInstanceOf(Function)
      })

      it('Should return the original chunk if the `format` is not "cjs" or "commonjs"!', async () => {
        const received = await index()
        expect(received.renderChunk(
          '',
          renderedChunk,
          { ...outputOptions, format: 'es' },
          { chunks: {} }
        )).toEqual(defaultValue)
      })

      it('Should return the original chunk if there is no `exports.default` in the code!', async () => {
        const received = await index()
        expect(received.renderChunk(
          '',
          renderedChunk,
          { ...outputOptions, format: 'cjs' },
          { chunks: {} }
        )).toEqual(defaultValue)
      })

      it('Should throw an error if the `exports.default` value is `null`!', async () => {
        const received = await index()
        expect((): void => {
          received.renderChunk(
            'var main=null;exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )
        }).toThrow(Error(
          'Failed to mix exports: "null" cannot be used as a default value. Only "object" and "function" are allowed.'
        ))
      })

      it('Should throw an error if the `exports.default` value is a `bigint`!', async () => {
        const received = await index()
        expect((): void => {
          received.renderChunk(
            'var main=0n;exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )
        }).toThrow(Error(
          'Failed to mix exports: "bigint" cannot be used as a default value. Only "object" and "function" are allowed.'
        ))
      })

      it('Should throw an error if the `exports.default` value is a `boolean`!', async () => {
        const received = await index()
        expect((): void => {
          received.renderChunk(
            'var main=false;exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )
        }).toThrow(Error(
          'Failed to mix exports: "boolean" cannot be used as a default value. Only "object" and "function" are allowed.'
        ))
      })

      it('Should throw an error if the `exports.default` value is a `number`!', async () => {
        const received = await index()
        expect((): void => {
          received.renderChunk(
            'var main=0;exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )
        }).toThrow(Error(
          'Failed to mix exports: "number" cannot be used as a default value. Only "object" and "function" are allowed.'
        ))
      })

      it('Should throw an error if the `exports.default` value is a `string`!', async () => {
        const received = await index()
        expect((): void => {
          received.renderChunk(
            'var main="";exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )
        }).toThrow(Error(
          'Failed to mix exports: "string" cannot be used as a default value. Only "object" and "function" are allowed.'
        ))
      })

      it('Should throw an error if the `exports.default` value is a `symbol`!', async () => {
        const received = await index()
        expect((): void => {
          received.renderChunk(
            'var main=Symbol("");exports.main=main;exports.default=main;',
            renderedChunk,
            { ...outputOptions, format: 'cjs' },
            { chunks: {} }
          )
        }).toThrow(Error(
          'Failed to mix exports: "symbol" cannot be used as a default value. Only "object" and "function" are allowed.'
        ))
      })

      it('Should return a rendered chunk with mixed exports!', async () => {
        const received = await index()
        expect(received.renderChunk(
          'var main = () => "main";\nexports.main = main;\nexports.default = main;',
          renderedChunk,
          { ...outputOptions, format: 'cjs' },
          { chunks: {} }
        )).toEqual({
          ...defaultValue,
          code: 'var main = () => "main";\nexports.main = main;\nexports.default = main;\nmodule.exports = exports.default;\nObject.defineProperties(module.exports, {\n  __esModule: { value: true },\n  main: { value: exports.main },\n  default: { value: exports.default }\n});'
        })
      })

      it('Should return a rendered chunk with mixed exports in a minified format!', async () => {
        const received = await index({ minify: true })
        expect(received.renderChunk(
          'var main=()=>"main";exports.main=main;exports.default=main;',
          renderedChunk,
          { ...outputOptions, format: 'cjs' },
          { chunks: {} }
        )).toEqual({
          ...defaultValue,
          code: 'var main=()=>"main";exports.main=main;exports.default=main;module.exports=exports.default;Object.defineProperties(module.exports,{__esModule:{value:!0},main:{value:exports.main},default:{value:exports.default}});'
        })
      })
    })
  })
})
