import { initStore } from '../../store'

import renderedChunk from '@tests/stubs/renderedChunk'
import outputOptions from '@tests/stubs/outputOptions'

import renderChunk from './renderChunk'

describe('Test `renderChunk`:', () => {
  const defaultValue = { code: '', map: null }

  beforeAll(async () => {
    await initStore()
  })

  it('Should return the original chunk if the `format` is not "cjs" or "commonjs"!', () => {
    const received = renderChunk(
      '',
      { ...renderedChunk, exports: [] },
      { ...outputOptions, format: 'es' }
    )

    const expected = defaultValue

    expect(received).toEqual(expected)
  })

  it('Should return the original chunk if the `exports` length is less than two!', () => {
    const received = renderChunk(
      '',
      { ...renderedChunk, exports: [] },
      { ...outputOptions, format: 'cjs' }
    )

    const expected = defaultValue

    expect(received).toEqual(expected)
  })

  it('Should return the original chunk if the `exports` doesn\'t include "default"!', () => {
    const received = renderChunk(
      '',
      { ...renderedChunk, exports: ['', ''] },
      { ...outputOptions, format: 'cjs' }
    )

    const expected = defaultValue

    expect(received).toEqual(expected)
  })

  it('Should throw an error if the segment code is more than two!', () => {
    const received = (): void => {
      renderChunk(
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
      renderChunk(
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
      renderChunk(
        'exports.main = main;',
        { ...renderedChunk, exports: ['main', 'default'] },
        { ...outputOptions, format: 'cjs' }
      )
    }
    const expected = Error

    expect(received).toThrow(expected)
  })

  it('Should return rendered chunk with mixing exports in un-minified format!', () => {
    const received = renderChunk(
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
    const received = renderChunk(
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
