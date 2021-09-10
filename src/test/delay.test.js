import { basename } from 'path'

/**
 * @level 1
 * @tags async
 */

const modName = basename(__filename, '.test.js')

describe('delay', () => {
  let delay
  beforeAll(async () => {
    jest.useFakeTimers('legacy')
    ;({ default: delay } = await import(`../main/${modName}`))
    expect(typeof delay).toBe('function')
  })
  beforeEach(() => {
    jest.clearAllTimers()
  })
  afterAll(async () => {
    jest.useRealTimers()
  })
  const waitNextTick = async () =>
    new Promise((resolve) => {
      process.nextTick(() => {
        resolve()
      })
    })
  test('should wait for 2s and resolve to true', async () => {
    // Given
    const durationMs = 2000
    const next = jest.fn()
    // When
    const promise = delay(durationMs, true)
    // Then
    promise.then(next)
    expect(next).not.toHaveBeenCalled()
    const noTicks = 10
    const tickDuration = durationMs / noTicks
    for await (let index of Array.from(Array(noTicks)).map((__, i) => i + 1)) {
      jest.advanceTimersByTime(tickDuration)
      await waitNextTick()
      if (index < noTicks) {
        expect(next).not.toHaveBeenCalled()
      } else {
        expect(next).toHaveBeenCalledTimes(1)
      }
    }
  })
})
