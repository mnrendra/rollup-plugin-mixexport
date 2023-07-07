import main from '.'

describe('Test `index`!', () => {
  it('should return \'Hello World!\'!', () => {
    const result = main()
    expect(result).toBe('Hello World!')
  })
})
