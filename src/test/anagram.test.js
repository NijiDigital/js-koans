import { basename } from 'path'

/**
 * @group sync
 * @group easy
 */

const modName = basename(__filename, '.test.js')

describe('anagram', () => {
  describe('isAnagram', () => {
    let isAnagram
    beforeAll(async () => {
      ;({ isAnagram } = await import(`../main/${modName}`))
    })
    test.each([
      [true, 'énergie noire', 'reine ignorée'],
      [false, 'énergie noire', 'reine ignoré'],
      [false, 'énergie noire', 'reine ignoréz'],
      [true, 'énergie  noire', 'reine ignorée  '],
      [true, 'Albert Einstein', "rien n'est établi"],
      [true, 'Entreprise Monsanto', 'poison très rémanent'],
      [true, 'Laurent Fabius', 'Naturel abusif'],
    ])('should return %p given %p and %p', (anagram, s1, s2) => {
      // When
      const result = isAnagram(s1, s2)
      // Then
      expect(result).toEqual(anagram)
    })
  })
})
