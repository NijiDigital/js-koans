import { basename } from 'path'

/**
 * @difficultyLevel 2
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('second cheapest', () => {
  describe('secondCheapestWineName', () => {
    let secondCheapestWineName
    beforeAll(async () => {
      ;({ secondCheapestWineName } = await import(`../main/${modName}`))
    })
    test('should return the second cheapest wine name given a list of wines', () => {
      // Given
      const wines = [
        { name: 'Wine A', price: 8.99 },
        { name: 'Wine 32', price: 13.99 },
        { name: 'Wine Cheapy', price: 1.99 },
        { name: 'Wine Cheapo', price: 1.99 },
        { name: 'Wine 9', price: 10.99 },
      ]
      // When
      const result = secondCheapestWineName(wines)
      // Then
      expect(result).toEqual('Wine A')
    })
  })
})
