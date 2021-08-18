import { basename } from 'path'

/**
 * @group sync
 * @group easy
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
    async (durationMs) => {
      // When
      chronometer.start()
      jest.advanceTimersByTime(durationMs)
      chronometer.stop()
      jest.runOnlyPendingTimers()
      // Then
      expect(chronometer.elapsedMs).toBe(durationMs)
    },
  )
})
