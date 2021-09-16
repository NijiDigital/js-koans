const handleError = (err, opt) => {
  if (typeof opt === 'function') {
    opt(err)
    return
  }
  if (typeof opt !== 'object' || !opt) {
    return
  }
  if (opt.type) {
    expect(err).toBeInstanceOf(opt.type)
  }
  if (opt.message) {
    expect(err).toHaveProperty('message', opt.message)
  }
  if (opt.handler) {
    opt.handler(err)
  }
}

const expectExtension = {
  toBeRejectedWith: async (promise, opt) => {
    try {
      await promise
    } catch (err) {
      handleError(err, opt)
      return { message: () => 'promise is rejected with expected error', pass: true }
    }
    return { message: () => 'promise is not rejected', pass: false }
  },
  toFulfillAfter: async (promiseFactory, durationMs, resultExpectations) => {
    jest.useFakeTimers('legacy')
    const waitNextTick = async () =>
      new Promise((resolve) => {
        process.nextTick(() => {
          resolve()
        })
      })
    try {
      const next = jest.fn()
      const promise = promiseFactory()
      promise.then(next).catch(next)
      let elapsedMs = 0
      const tickMs = 10
      do {
        if (next.mock.calls.length !== 0) {
          return { message: () => 'function called too soon', pass: false }
        }
        jest.advanceTimersByTime(tickMs)
        await waitNextTick()
        elapsedMs += tickMs
      } while (elapsedMs < durationMs)
      jest.advanceTimersByTime(tickMs)
      await waitNextTick()
      if (next.mock.calls.length !== 1) {
        return { message: () => 'promise fulfilled too late', pass: false }
      }
      if (resultExpectations) {
        await resultExpectations(promise)
      }
      return {
        message: () => `promise is successfully fulfilled after ${durationMs}ms`,
        pass: true,
      }
    } finally {
      jest.useRealTimers()
    }
  },
  toHaveFailedWith: (fn, opt) => {
    try {
      fn()
    } catch (err) {
      handleError(err, opt)
      return { message: () => 'function thrown expected error', pass: true }
    }
    return { message: () => 'function did not throw any error', pass: false }
  },
}

expect.extend(expectExtension)
