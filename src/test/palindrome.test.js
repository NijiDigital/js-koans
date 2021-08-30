import { basename } from 'path'

/**
 * @difficultyLevel 2
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('palindrome', () => {
  describe('isPalindrome', () => {
    let isPalindrome
    beforeAll(async () => {
      ;({ isPalindrome } = await import(`../main/${modName}`))
    })
    test.each([
      [true, 'radar'],
      [false, 'maison'],
      [false, 'table'],
      [true, ' essayasse'],
      [true, 'Ressasser'],
      [true, 'rêver'],
      [true, 'réifier'],
    ])('should return %p given %p', (expectedResult, s) => {
      // When
      const result = isPalindrome(s)
      // Then
      expect(result).toBe(expectedResult)
    })
  })
})
