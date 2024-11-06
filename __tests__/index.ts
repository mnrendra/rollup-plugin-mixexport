import type { InputPluginOption, NormalizedOutputOptions, RenderedChunk } from 'rollup'

import type { Plugin } from '@/types'

import { type Package, readPackage } from '@mnrendra/read-package'

import read from '@tests/utils/read'

import index from '..'

interface Meta {
  chunks: Record<string, RenderedChunk>
}

describe('Test all features:', () => {
  let plugin = {} as unknown as Plugin
  let pkg = {} as unknown as Package

  beforeEach(async () => {
    plugin = await index()
    pkg = await readPackage()
  })

  it('Should have a `name`!', () => {
    expect(plugin.name).toBe('mixexport')
  })

  it('Should have a `version`!', () => {
    expect(plugin.version).toBe(pkg.version)
  })

  it('Should reject within error when the preceding plugin is an object!', () => {
    const received = (): void => {
      plugin.buildStart({
        plugins: {} as unknown as InputPluginOption
      })
    }

    const expected = Error(`"rollup-plugin-esbuild" or "@mnrendra/rollup-plugin-alias" is required and must be invoked immediately before "${pkg.name}"!\nMore info: ${pkg.homepage}`)

    expect(received).toThrow(expected)
  })

  it('Should reject within error when the preceding plugin is `undefined`!', () => {
    const received = (): void => {
      plugin.buildStart({
        plugins: [] as unknown as InputPluginOption
      })
    }

    const expected = Error(`"rollup-plugin-esbuild" or "@mnrendra/rollup-plugin-alias" is required and must be invoked immediately before "${pkg.name}"!\nMore info: ${pkg.homepage}`)

    expect(received).toThrow(expected)
  })

  it('Should reject within error when the preceding plugin name is not "esbuild" or "alias"!', () => {
    const received = (): void => {
      plugin.buildStart({
        plugins: [{ name: '' }] as unknown as InputPluginOption
      })
    }

    const expected = Error(`"rollup-plugin-esbuild" or "@mnrendra/rollup-plugin-alias" is required and must be invoked immediately before "${pkg.name}"!\nMore info: ${pkg.homepage}`)

    expect(received).toThrow(expected)
  })

  it('Should reject within error when the preceding plugin is `null`!', () => {
    const received = (): void => {
      plugin.buildStart({
        plugins: [null] as unknown as InputPluginOption
      })
    }

    const expected = Error(`"rollup-plugin-esbuild" or "@mnrendra/rollup-plugin-alias" is required and must be invoked immediately before "${pkg.name}"!\nMore info: ${pkg.homepage}`)

    expect(received).toThrow(expected)
  })

  it('Should resolve a code as "./tests/dummies/1.resource.js" when given "./tests/dummies/1.resource.js" and `plugin.format` set to "cjs"`!', async () => {
    const received = await plugin.renderChunk(
      read('./tests/dummies/1.resource.js'),
      {} as unknown as RenderedChunk,
      {} as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    const expected = read('./tests/dummies/1.resource.js')

    expect(received.code).toBe(expected)
  })

  it('Should resolve a code as "./tests/dummies/1.expected.js" when given "./tests/dummies/1.resource.js"!', async () => {
    const received = await plugin.renderChunk(
      read('./tests/dummies/1.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    const expected = read('./tests/dummies/1.expected.js')

    expect(received.code).toBe(expected)
  })

  it('Should resolve a code as "./tests/dummies/2.expected.js" when given "./tests/dummies/2.resource.js"!', async () => {
    const received = await plugin.renderChunk(
      read('./tests/dummies/2.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    const expected = read('./tests/dummies/2.expected.js')

    expect(received.code).toBe(expected)
  })

  it('Should resolve a code as "./tests/dummies/3.expected.js" when given "./tests/dummies/3.resource.js"!', async () => {
    const received = await plugin.renderChunk(
      read('./tests/dummies/3.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    const expected = read('./tests/dummies/3.expected.js')

    expect(received.code).toBe(expected)
  })

  it('Should reject within error when given "./tests/dummies/9.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/9.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('The `exports` object is defined using `defineProperties`, so it cannot be imported using destructuring as `import { ... }`!'))
  })

  it('Should reject within error when given "./tests/dummies/10.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/10.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('Unable to extract the named export! Start: 194, End: 197'))
  })

  it('Should reject within error when given "./tests/dummies/11.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/11.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('Invalid named export property descriptor! Start: 182, End: 191'))
  })

  it('Should reject within error when given "./tests/dummies/12.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/12.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('The `amount` export has a getter and additional attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given "./tests/dummies/13.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/13.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('The `amount` export has a getter and additional attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given "./tests/dummies/14.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/14.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('The `amount` export has a value and setter attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given "./tests/dummies/15.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/15.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('The `amount` export has a value and configurable attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given "./tests/dummies/16.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/16.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('The `amount` export has no value or getter attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given "./tests/dummies/17.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/17.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('The `amount` export has a value or getter with `enumerable` set to `false` in its attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given "./tests/dummies/18.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/18.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('The `amount` export has a value or getter with `enumerable` set to `false` in its attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given "./tests/dummies/19.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/19.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('The `amount` export has a value or getter with `enumerable` set to `false` in its attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given "./tests/dummies/20.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/20.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('The `amount` export has a value or getter with `enumerable` set to `false` in its attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should resolve a code as "./tests/dummies/21.expected.js" when given "./tests/dummies/21.resource.js"!', async () => {
    const received = await plugin.renderChunk(
      read('./tests/dummies/21.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    const expected = read('./tests/dummies/21.expected.js')

    expect(received.code).toBe(expected)
  })

  it('Should resolve a code as "./tests/dummies/22.expected.js" when given "./tests/dummies/22.resource.js"!', async () => {
    const received = await plugin.renderChunk(
      read('./tests/dummies/22.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    const expected = read('./tests/dummies/22.expected.js')

    expect(received.code).toBe(expected)
  })

  it('Should resolve a code as "./tests/dummies/23.expected.js" when given "./tests/dummies/23.resource.js"!', async () => {
    const received = await plugin.renderChunk(
      read('./tests/dummies/23.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    const expected = read('./tests/dummies/23.expected.js')

    expect(received.code).toBe(expected)
  })

  it('Should resolve a code as "./tests/dummies/24.expected.js" when given "./tests/dummies/24.resource.js"!', async () => {
    const received = await plugin.renderChunk(
      read('./tests/dummies/24.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    const expected = read('./tests/dummies/24.expected.js')

    expect(received.code).toBe(expected)
  })

  it('Should resolve a code as "./tests/dummies/25.expected.js" when given "./tests/dummies/25.resource.js"!', async () => {
    const received = await plugin.renderChunk(
      read('./tests/dummies/25.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    const expected = read('./tests/dummies/25.expected.js')

    expect(received.code).toBe(expected)
  })

  it('Should reject within error when given "./tests/dummies/26.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/26.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('Your code contains both `module.exports` and `exports.default`, which is not recommended. Please use one!'))
  })

  it('Should reject within error when given "./tests/dummies/27.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/27.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('Failed to mix exports: "bigint" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given "./tests/dummies/28.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/28.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('Failed to mix exports: "boolean" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given "./tests/dummies/29.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/29.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('Failed to mix exports: "number" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given "./tests/dummies/30.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/30.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('Failed to mix exports: "string" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given "./tests/dummies/31.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/31.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('Failed to mix exports: "symbol" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given "./tests/dummies/32.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/32.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('Failed to mix exports: "null" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should resolve "./tests/dummies/33.expected.js" when given "./tests/dummies/33.resource.js"!', async () => {
    const received = await plugin.renderChunk(
      read('./tests/dummies/33.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    const expected = read('./tests/dummies/33.expected.js')

    expect(received.code).toBe(expected)
  })

  it('Should reject within error when given "./tests/dummies/34.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/34.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('Your code contains a shebang "#!/usr/bin/env node" and exports, so it cannot be processed!'))
  })

  it('Should reject within error when given "./tests/dummies/35.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/35.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('Your code contains a shebang "#!/usr/bin/env node" and exports, so it cannot be processed!'))
  })

  it('Should reject within error when given "./tests/dummies/36.resource.js"!', async () => {
    const received = plugin.renderChunk(
      read('./tests/dummies/36.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    await expect(received).rejects.toThrow(Error('Your code contains a shebang "#!/usr/bin/env node" and exports, so it cannot be processed!'))
  })

  it('Should resolve "./tests/dummies/37.expected.js" when given "./tests/dummies/37.resource.js"!', async () => {
    const received = await plugin.renderChunk(
      read('./tests/dummies/37.resource.js'),
      {} as unknown as RenderedChunk,
      { format: 'cjs' } as unknown as NormalizedOutputOptions,
      {} as unknown as Meta
    )

    const expected = read('./tests/dummies/37.expected.js')

    expect(received.code).toBe(expected)
  })

  describe('By setting `defineEsModule` option to be `true`:', () => {
    let plugin = {} as unknown as Plugin

    beforeEach(async () => {
      plugin = await index({ defineEsModule: true })
    })

    it('Should resolve a code as "./tests/dummies/4.expected.js" when given "./tests/dummies/4.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/4.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/4.expected.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/6.expected.js" when given "./tests/dummies/6.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/6.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/6.expected.js')

      expect(received.code).toBe(expected)
    })
  })

  describe('By setting `defineEsModule` option to be `false`:', () => {
    let plugin = {} as unknown as Plugin

    beforeEach(async () => {
      plugin = await index({ defineEsModule: false })
    })

    it('Should resolve a code as "./tests/dummies/5.expected.js" when given "./tests/dummies/5.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/5.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/5.expected.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/7.expected.js" when given "./tests/dummies/7.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/7.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/7.expected.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/8.expected.js" when given "./tests/dummies/8.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/8.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/8.expected.js')

      expect(received.code).toBe(expected)
    })
  })

  describe('By setting `defineEsModule` option to be `true` and `minify` option to be `true`:', () => {
    let plugin = {} as unknown as Plugin

    beforeEach(async () => {
      plugin = await index({ defineEsModule: true, minify: true })
    })

    it('Should resolve a code as "./tests/dummies/4.expected.min.js" when given "./tests/dummies/4.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/4.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/4.expected.min.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/6.expected.min.js" when given "./tests/dummies/6.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/6.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/6.expected.min.js')

      expect(received.code).toBe(expected)
    })
  })

  describe('By setting `defineEsModule` option to be `false` and `minify` option to be `true`:', () => {
    let plugin = {} as unknown as Plugin

    beforeEach(async () => {
      plugin = await index({ defineEsModule: false, minify: true })
    })

    it('Should resolve a code as "./tests/dummies/5.expected.min.js" when given "./tests/dummies/5.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/5.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/5.expected.min.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/7.expected.min.js" when given "./tests/dummies/7.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/7.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/7.expected.min.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/8.expected.min.js" when given "./tests/dummies/8.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/8.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/8.expected.min.js')

      expect(received.code).toBe(expected)
    })
  })

  describe('By setting `minify` option to be `true`:', () => {
    let plugin = {} as unknown as Plugin

    beforeEach(async () => {
      plugin = await index({ minify: true })
    })

    it('Should resolve a code as "./tests/dummies/1.expected.min.js" when given "./tests/dummies/1.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/1.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/1.expected.min.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/2.expected.min.js" when given "./tests/dummies/2.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/2.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/2.expected.min.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/3.expected.min.js" when given "./tests/dummies/3.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/3.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/3.expected.min.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/21.expected.min.js" when given "./tests/dummies/21.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/21.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/21.expected.min.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/22.expected.min.js" when given "./tests/dummies/22.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/22.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/22.expected.min.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/23.expected.min.js" when given "./tests/dummies/23.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/23.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/23.expected.min.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/24.expected.min.js" when given "./tests/dummies/24.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/24.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/24.expected.min.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve a code as "./tests/dummies/25.expected.min.js" when given "./tests/dummies/25.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/25.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/25.expected.min.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve "./tests/dummies/33.expected.min.js" when given "./tests/dummies/33.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/33.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/33.expected.min.js')

      expect(received.code).toBe(expected)
    })

    it('Should resolve "./tests/dummies/37.expected.min.js" when given "./tests/dummies/37.resource.js"!', async () => {
      const received = await plugin.renderChunk(
        read('./tests/dummies/37.resource.js'),
        {} as unknown as RenderedChunk,
        { format: 'cjs' } as unknown as NormalizedOutputOptions,
        {} as unknown as Meta
      )

      const expected = read('./tests/dummies/37.expected.min.js')

      expect(received.code).toBe(expected)
    })
  })
})
