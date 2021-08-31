import { basename } from 'path'

/**
 * @level 2
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('compute cart', () => {
  describe('computeCart', () => {
    let computeCart
    beforeAll(async () => {
      ;({ computeCart } = await import(`../main/${modName}`))
    })
    test('should return the total price given cart items', () => {
      // Given
      // cart content : 3 lines and 2 lines, each line is : qty * unit price
      const cartContent = `3
3 47
6 78
1 123
2
6 33
3 78
`
      const exptectedResult = 3 * 47 + 6 * 78 + 123 + 6 * 33 + 3 * 78
      // When
      const result = computeCart(cartContent)
      // Then
      expect(result).toBe(exptectedResult)
    })
  })
})
