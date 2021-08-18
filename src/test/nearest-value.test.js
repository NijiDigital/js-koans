import { basename } from 'path'

/**
 * @group sync
 * @group easy
 */

const modName = basename(__filename, '.test.js')

describe('nearest value', () => {
  describe('nearestValue', () => {
    let nearestValue
    beforeAll(async () => {
      ;({ nearestValue } = await import(`../main/${modName}`))
    })
    test.each([
      [10, 9, [4, 7, 10, 11, 12, 17]],
      [7, 8, [4, 7, 10, 11, 12, 17]],
      [8, 9, [4, 10, 8, 11, 12, 17]],
      [9, 9, [4, 9, 10, 11, 12, 17]],
      [4, 0, [4, 7, 10, 11, 12, 17]],
      [17, 100, [4, 7, 10, 11, 12, 17]],
      [8, 7, [5, 10, 8, 12, 89, 100]],
      [-1, 0, [-1, 2, 3]],
      [undefined, 0, []],
    ])('should return a maximum length of %i given %p', (expectedResult, search, values) => {
      // When
      const result = nearestValue(values, search)
      // Then
      expect(result).toEqual(expectedResult)
    })
  })
})
