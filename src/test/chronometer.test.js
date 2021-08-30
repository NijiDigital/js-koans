import { basename } from 'path'

/**
 * @difficultyLevel 2
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('chronometer', () => {
  let Chronometer
  let chronometer
  beforeAll(async () => {
    ;({ Chronometer } = await import(`../main/${modName}`))
    expect(typeof Chronometer).toBe('function')
    jest.useFakeTimers()
    chronometer = new Chronometer()
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
