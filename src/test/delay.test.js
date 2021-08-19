import { basename } from 'path'

/**
 * @group async
 * @group supereasy
 */

const modName = basename(__filename, '.test.js')

describe('delay', () => {
  let Chronometer
  let delay
  beforeAll(async () => {
    ;({ Chronometer } = await import('../main/chronometer'))
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
    const chronometer = new Chronometer()
    chronometer.start()
    const durationMs = 20
    // When
    const promise = delay(durationMs, true)
    jest.advanceTimersByTime(durationMs)
    const result = await promise
    // Then
    chronometer.stop()
    jest.runOnlyPendingTimers()
    expect(result).toBe(true)
    expect(chronometer.elapsedMs).toBeGreaterThanOrEqual(durationMs)
  })
})
