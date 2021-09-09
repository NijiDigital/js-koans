import { basename } from 'path'

/**
 * @level 1
 * @tags async
 */

const modName = basename(__filename, '.test.js')

describe('delay', () => {
  let delay
  beforeAll(async () => {
    ;({ default: delay } = await import(`../main/${modName}`))
    expect(typeof delay).toBe('function')
  })
  test('should wait for 20ms and resolve to true', (done) => {
    // Given
    const durationMs = 200
    const next = jest.fn()
    const start = Number(process.hrtime.bigint())
    // When
    const promise = delay(durationMs, true)
    // Then
    promise.then(next)
    const timer = setInterval(() => {
      const elapsedMs = (Number(process.hrtime.bigint()) - start) / 1e6
      if (elapsedMs >= durationMs) {
        expect(next).toHaveBeenNthCalledWith(1, true)
        clearInterval(timer)
        done()
      } else {
        expect(next).not.toHaveBeenCalled()
      }
    }, 10)
  })
})
