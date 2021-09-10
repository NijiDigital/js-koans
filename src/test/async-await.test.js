import { basename } from 'path'

/**
 * @level 2
 * @tags async
 */

const modName = basename(__filename, '.test.js')

describe('async await', () => {
  let doAsync
  beforeAll(async () => {
    ;({ doAsync } = await import(`../main/${modName}`))
    expect(typeof doAsync).toBe('function')
  })
  test('should resolve after 1s with given value', async () => {
    // When
    const promiseFactory = () => doAsync('hello')
    // Then
    await expect(promiseFactory).toFulfillAfter(1000, async (promise) => {
      const result = await promise
      expect(result).toBe('hello')
    })
  })
  test('should reject after 1s with given error', async () => {
    // When
    const error = new Error('oops')
    const promiseFactory = () => doAsync(undefined, error)
    // Then
    await expect(promiseFactory).toFulfillAfter(1000, async (promise) => {
      await expect(promise).toBeRejectedWith(error)
    })
  })
  test('should throw an error synchronously and log it', async () => {
    // When
    const error = new Error('oops')
    const log = jest.fn()
    const promise = doAsync(undefined, error, true, log)
    // Then
    expect(log).toHaveBeenNthCalledWith(1, error.message)
    await expect(promise).toBeRejectedWith(error)
  })
  test('should reject after 1s and log the given error', async () => {
    // When
    const error = new Error('oops')
    const log = jest.fn()
    const promiseFactory = () => doAsync(undefined, error, false, log)
    // Then
    await expect(promiseFactory).toFulfillAfter(1000, async (promise) => {
      await expect(promise).toBeRejectedWith(error)
      expect(log).toHaveBeenNthCalledWith(1, error.message)
    })
  })
})
