import { basename } from 'path'

/**
 * @level 1
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('truthy', () => {
  let mod
  beforeAll(async () => {
    mod = await import(`../main/${modName}`)
  })
  describe('getAllFalsies', () => {
    let getAllFalsies
    beforeAll(() => {
      ;({ getAllFalsies } = mod)
    })
    test('should return a list of all possible falsy values', () => {
      // When
      const result = getAllFalsies()
      // Then
      const uniqFalsies = new Set(result)
      expect(result.length).toBe(6)
      expect(uniqFalsies.size).toBe(result.length)
      result.forEach((value) => {
        expect(value).toBeFalsy()
      })
    })
  })
  describe('getAllTruthies', () => {
    let getAllTruthies
    beforeAll(() => {
      ;({ getAllTruthies } = mod)
    })
    test('should return a list of all possible truthy values', () => {
      // When
      const result = getAllTruthies()
      // Then
      const uniqTruthies = new Set(result)
      expect(result.length).toBe(7)
      expect(uniqTruthies.size).toBe(result.length)
      result.forEach((value) => {
        expect(value).toBeTruthy()
      })
    })
  })
})
