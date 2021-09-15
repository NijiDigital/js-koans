import { basename } from 'path'

/**
 * @level 2
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('chronometer', () => {
  let createChronometer
  let chronometer
  beforeAll(async () => {
    ;({ createChronometer } = await import(`../main/${modName}`))
    expect(typeof createChronometer).toBe('function')
    jest.useFakeTimers()
    chronometer = createChronometer()
  })
  afterEach(() => {
    jest.clearAllTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })
  test.each([[20], [5000]])(
    'should start a new chronometer, wait %i, stop it, and check elapsed time',
    (durationMs) => {
      // When
      chronometer.start()
      jest.advanceTimersByTime(durationMs)
      chronometer.stop()
      jest.runOnlyPendingTimers()
      // Then
      expect(chronometer).toHaveProperty('elapsedMs', durationMs)
    },
  )
})
