import got from 'got'
import { from } from 'rxjs'

const ajax = (opt) => {
  const options = {
    resolveBodyOnly: true,
    responseType: 'json',
  }
  if (typeof opt === 'string') {
    options.url = opt
  }
  if (typeof opt === 'object') {
    Object.assign(options, opt)
  }
  return from(got(options))
}

export { ajax }
