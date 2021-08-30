import { basename } from 'path'

/**
 * @difficultyLevel 1
 * @tags async
 */

const modName = basename(__filename, '.test.js')

describe('delay', () => {
  let delay
  beforeAll(async () => {
    ;({ default: delay } = await import(`../main/${modName}`))
    expect(typeof delay).toBe('function')
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.clearAllTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })
  test('should wait for 20ms and resolve to true', async () => {
    // Given
    const start = Number(process.hrtime.bigint())
    const durationMs = 20
    // When
    const promise = delay(durationMs, true)
    jest.advanceTimersByTime(durationMs)
    const result = await promise
    // Then
    const elapsedMs = (Number(process.hrtime.bigint()) - start) / 1e6
    jest.runOnlyPendingTimers()
    expect(result).toBe(true)
    expect(elapsedMs).toBeGreaterThanOrEqual(durationMs)
  })
})
