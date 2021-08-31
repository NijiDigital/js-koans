import { basename } from 'path'

/**
 * @level 2
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('alphabet', () => {
  describe('buildLetters', () => {
    let buildLetters
    beforeAll(async () => {
      ;({ buildLetters } = await import(`../main/${modName}`))
    })
    test('should return a string with all letters of alphabet', () => {
      // When
      const result = buildLetters()
      // Then
      expect(result).toEqual('abcdefghijklmnopqrstuvwxyz')
    })
    test("should return a string with letters from 'c' to 'x'", () => {
      // When
      const result = buildLetters('c', 'x')
      // Then
      expect(result).toEqual('cdefghijklmnopqrstuvwx')
    })
    test("should return a string with letters from 'g' to 'm'", () => {
      // When
      const result = buildLetters('g', 'm')
      // Then
      expect(result).toEqual('ghijklm')
    })
    test("should return a string with letters from 'o' to 'z'", () => {
      // When
      const result = buildLetters('o')
      // Then
      expect(result).toEqual('opqrstuvwxyz')
    })
  })
})
