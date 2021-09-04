import { basename } from 'path'

/**
 * @level 1
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('counter', () => {
  describe('counter factory', () => {
    let counterFactory
    beforeAll(async () => {
      counterFactory = (await import(`../main/${modName}`)).default
    })
    describe('increase counter', () => {
      let increaseCounter
      beforeAll(() => {
        increaseCounter = counterFactory()
      })
      test.each(Array.from(Array(20)).map((__, index) => ({ expectedResult: index + 1 })))(
        'should increase counter value and return $expectedResult',
        ({ expectedResult }) => {
          // When
          const result = increaseCounter()
          // Then
          expect(result).toBe(expectedResult)
        },
      )
    })
  })
})
