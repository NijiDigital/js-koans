import { basename } from 'path'

/**
 * @difficultyLevel 2
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('sum', () => {
  let sum
  beforeAll(async () => {
    ;({ default: sum } = await import(`../main/${modName}`))
  })
  test.each([
    [6, [1, 2, 3, '']],
    [6, [1, 2, '', 3]],
    [6, [1, [2, 3]]],
    [6, [1, '', 2, 3]],
  ])('should return %i given %p', (expectedValue, values) => {
    // When
    const result = sum(...values)
    // Then
    expect(result).toBe(Number(expectedValue))
  })
})
