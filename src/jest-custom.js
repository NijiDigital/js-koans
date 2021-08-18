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

jest.setTimeout(10000)
