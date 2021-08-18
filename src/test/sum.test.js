import { basename } from 'path'

/**
 * @group sync
 * @group easy
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
