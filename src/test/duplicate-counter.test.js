import { basename } from 'path'

/**
 * @group sync
 * @group supereasy
 */

const modName = basename(__filename, '.test.js')

describe('duplicate counter', () => {
  describe('countDuplicate', () => {
    let countDuplicate
    beforeAll(async () => {
      ;({ countDuplicate } = await import(`../main/${modName}`))
    })
    test('should return the number of duplicates given an array of values', () => {
      // Given
      const ar = [5, 3, 3, 5, 1, 4, 7]
      // When
      const result = countDuplicate(ar)
      // Then
      expect(result).toBe(2)
    })
  })
})
