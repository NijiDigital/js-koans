import { basename } from 'path'

/**
 * @difficultyLevel 1
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('sequence', () => {
  describe('createSequence', () => {
    let createSequence
    beforeAll(async () => {
      ;({ createSequence } = await import(`../main/${modName}`))
    })
    test('should create a sequence of given length', () => {
      // Given
      const length = 7
      // When
      const result = createSequence(length)
      // Then
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
  })
})
