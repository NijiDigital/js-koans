import { basename } from 'path'

/**
 * @level 2
 * @tags async
 */

const modName = basename(__filename, '.test.js')

describe('each async', () => {
  describe('eachAsync', () => {
    let eachAsync
    beforeAll(async () => {
      ;({ eachAsync } = await import(`../main/${modName}`))
      jest.useFakeTimers()
    })
    afterEach(() => {
      jest.clearAllTimers()
    })
    afterAll(() => {
      jest.useRealTimers()
    })
    test('should iterate through loop and execute async function', async () => {
      // Given
      const list = Array.from(Array(3)).map((__, index) => index + 1)
      const result = []
      const addLater = (value) =>
        new Promise((resolve) => {
          setTimeout(() => {
            result.unshift(value)
            resolve()
          }, value * 1000)
        })
      // When
      const promise = eachAsync(list, (value) => {
        try {
          return addLater(value)
        } finally {
          jest.advanceTimersByTime(value * 1000)
        }
      })
      await promise
      jest.runOnlyPendingTimers()
      // Then
      expect(result).toEqual([3, 2, 1])
    })
  })
})
