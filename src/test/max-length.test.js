import { basename } from 'path'

/**
 * @group sync
 * @group easy
 */

const modName = basename(__filename, '.test.js')

describe('max length', () => {
  describe('maxLength', () => {
    let maxLength
    beforeAll(async () => {
      ;({ maxLength } = await import(`../main/${modName}`))
    })
    test.each([
      [13, ['Http Response', 'code', 'message']],
      [11, ['200', 'ANY_CODE', 'any message']],
      [17, ['404', 'ANY_ERROR', 'any error message']],
    ])('should return a maximum length of %i given %p', (expectedResult, ar) => {
      // When
      const result = maxLength(ar)
      // Then
      expect(result).toEqual(expectedResult)
    })
  })
})
