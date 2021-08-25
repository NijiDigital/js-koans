import { basename } from 'path'

/**
 * @group async
 * @group medium
 */

const modName = basename(__filename, '.test.js')

describe('progressive delay', () => {
  let progressiveDelay
  beforeAll(async () => {
    jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      cb()
    })
    ;({ progressiveDelay } = await import(`../main/${modName}`))
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.restoreAllMocks()
  })
  test('should wait 1s, then call given function, then wait 2s, then call again, then wait 3s, then call again', async () => {
    const fn = jest.fn()
    const promise = progressiveDelay(3, fn)
    expect(fn).not.toHaveBeenCalled()
    await promise
    expect(setTimeout).toHaveBeenCalledTimes(3)
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000)
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000)
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000)
    expect(fn).toHaveBeenCalledTimes(3)
  })
})
