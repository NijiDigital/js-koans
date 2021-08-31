import { basename } from 'path'

/**
 * @level 1
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('numbers', () => {
  describe('findMultiples', () => {
    let findMultiples
    beforeAll(async () => {
      ;({ findMultiples } = await import(`../main/${modName}`))
    })
    test.each([
      { expectedResult: [2, 4, 6], max: 7, multiplesOf: 2 },
      { expectedResult: [3, 6, 9], max: 10, multiplesOf: 3 },
      { expectedResult: [3, 5, 6, 9, 10], max: 10, multiplesOf: [3, 5] },
      { expectedResult: [15, 27, 30, 45, 54, 60, 75, 81, 90], max: 100, multiplesOf: [15, 27] },
    ])(
      'should return $expectedResult as multiples of $multiplesOf that are less or equal to $max',
      ({ expectedResult, max, multiplesOf }) => {
        // When
        const result = findMultiples(max, multiplesOf)
        // Then
        expect(result).toEqual(expectedResult)
      },
    )
  })
})
