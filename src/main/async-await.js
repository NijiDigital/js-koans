const doAfter1s = (value, error, syncError, log) => {
  if (error && syncError) {
    throw error
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(error)
      } else {
        resolve(value)
      }
    }, 1000)
  })
}

const doAsync = (value, error, syncError, log) => {
  throw new Error(
    `Please FIXME and do something with: ${JSON.stringify({ error, log, syncError, value })}`,
  )
}

export { doAsync }
