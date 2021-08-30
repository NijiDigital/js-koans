import { basename } from 'path'

/**
 * @difficultyLevel 1
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('counter', () => {
  describe('counter factory', () => {
    let counterFactory
    beforeAll(async () => {
      ;({ default: counterFactory } = await import(`../main/${modName}`))
    })
    describe('increase counter', () => {
      let increaseCounter
      beforeAll(() => {
        increaseCounter = counterFactory()
      })
      test('should increase counter value 20 times', () => {
        Array.from(Array(20))
          .map((__, index) => index + 1)
          .forEach((expectedResult) => {
            // When
            const result = increaseCounter()
            // Then
            expect(result).toBe(expectedResult)
          })
      })
    })
  })
})
