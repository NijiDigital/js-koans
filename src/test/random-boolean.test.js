import { basename } from 'path'

/**
 * @level 1
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('random boolean', () => {
  let mod
  beforeAll(async () => {
    mod = await import(`../main/${modName}`)
  })
  describe('randomBoolean', () => {
    let randomBoolean
    beforeAll(() => {
      ;({ randomBoolean } = mod)
    })
    test('should return 100 random booleans and ensure that they are not always the same', () => {
      // When
      let value
      const alwaysSameValue = Array.from(Array(100)).reduce((same) => {
        const oldValue = value
        value = randomBoolean()
        expect(value === true || value === false).toBeTruthy()
        return same && (oldValue === undefined || value === oldValue)
      }, true)
      // Then
      expect(alwaysSameValue).toBe(false)
    })
  })
})
