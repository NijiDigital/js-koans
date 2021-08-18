/**
 * @group sync
 * @group easy
 */

import { basename } from 'path'

const modName = basename(__filename, '.test.js')

describe('factorial', () => {
  let factorial
  beforeAll(async () => {
    ;({ default: factorial } = await import(`../main/${modName}`))
    expect(typeof factorial).toBe('function')
  })
  test.each([
    [2, 2],
    [6, 3],
    [24, 4],
    [120, 5],
    [720, 6],
    [5040, 7],
    [40320, 8],
    [362880, 9],
    [3628800, 10],
    [39916800, 11],
    [479001600, 12],
    [6227020800, 13],
    [87178291200, 14],
    [1307674368000, 15],
    [20922789888000, 16],
    [1, 1],
  ])('should return %i given %i', (expectedResult, x) => {
    // When
    const result = factorial(x)
    // Then
    expect(result).toBe(expectedResult)
  })
})
