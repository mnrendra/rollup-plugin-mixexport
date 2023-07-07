import main from './main'

describe('Test `main`!', () => {
  it('should return \'Hello World!\'!', () => {
    const result = main()
    expect(result).toBe('Hello World!')
  })
})
