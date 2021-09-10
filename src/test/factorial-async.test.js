import { basename } from 'path'

/**
 * @level 3
 * @tags async
 */

const modName = basename(__filename, '.test.js')

describe('factorial-async', () => {
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
  ])('should wait for 20ms and resolve to %i given %i', async (expectedResult, x) => {
    // Given
    const durationMs = 20
    // When
    const promiseFactory = () => factorial(x)
    // Then
    await expect(promiseFactory).toFulfillAfter(durationMs, async (promise) => {
      const result = await promise
      expect(result).toBe(expectedResult)
    })
  })
})
