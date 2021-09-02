import { basename } from 'path'

import { ajax } from '../main/ajax'

/**
 * @factor 2
 * @level 3
 * @tags async, reactive
 */

const modName = basename(__filename, '.test.js')

describe('reactive utils', () => {
  let reactiveUtils
  beforeAll(async () => {
    ;({ default: reactiveUtils } = await import(`../main/${modName}`))
  })
  let button
  beforeEach(() => {
    button = {
      addEventListener: jest.fn((__, listener) => {
        button.listener = listener
      }),
      click: () => {
        if (button.listener) {
          button.listener()
        }
      },
      removeEventListener: jest.fn(),
    }
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe('tenthSecondsClock$', () => {
    let tenthSecondsClock$
    beforeAll(async () => {
      ;({ tenthSecondsClock$ } = reactiveUtils)
    })
    const delay = (ms) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, ms)
      })
    test('should tick every tenth of seconds', async () => {
      const tick = jest.fn()
      const subscription = tenthSecondsClock$.subscribe(tick)
      const unsubscriptionPromise = new Promise((resolve) => {
        setTimeout(() => {
          subscription.unsubscribe()
          resolve()
        }, 3 * 100)
      })
      await delay(10)
      expect(tick).toHaveBeenCalledTimes(1)
      await delay(100)
      expect(tick).toHaveBeenCalledTimes(2)
      await delay(100)
      expect(tick).toHaveBeenCalledTimes(3)
      await unsubscriptionPromise
      expect(tick).toHaveBeenCalledTimes(3)
    })
    test('should call tick every tenth of seconds passing call counts as argument ', async () => {
      const tick = jest.fn()
      const subscription = tenthSecondsClock$.subscribe(tick)
      const unsubscriptionPromise = new Promise((resolve) => {
        setTimeout(() => {
          subscription.unsubscribe()
          resolve()
        }, 3 * 100)
      })
      await delay(10)
      expect(tick).toHaveBeenNthCalledWith(1, 1)
      await delay(100)
      expect(tick).toHaveBeenNthCalledWith(2, 2)
      await delay(100)
      expect(tick).toHaveBeenNthCalledWith(3, 3)
      await unsubscriptionPromise
      expect(tick).toHaveBeenCalledTimes(3)
    })
  })
  xdescribe('changeOn3rdClick', () => {
    let changeOn3rdClick
    beforeAll(async () => {
      ;({ changeOn3rdClick } = reactiveUtils)
    })
    test('should change output text when button is clicked 3 times', () => {
      // Given
      const output = { textContent: 'hello' }
      // When
      changeOn3rdClick(button, output, 'world!')
      // Then
      expect(button.addEventListener).toHaveBeenNthCalledWith(
        1,
        'click',
        expect.any(Function),
        undefined,
      )
      expect(button.removeEventListener).not.toHaveBeenCalled()
      expect(button.listener).toBeTruthy()
      expect(output.textContent).toEqual('hello')
      // When
      button.click()
      // Then
      expect(output.textContent).toEqual('hello')
      // When
      button.click()
      // Then
      expect(output.textContent).toEqual('hello')
      // When
      button.click()
      // Then
      expect(output.textContent).toEqual('world!')
    })
  })
  describe('shortestRequest', () => {
    jest.setTimeout(10000)
    let shortestRequest
    beforeAll(async () => {
      ;({ shortestRequest } = reactiveUtils)
    })
    test('should get response data of the shortest http request', async () => {
      // Given
      const requests = [
        { delay: 2, userId: 1 },
        { delay: 1, userId: 3 },
        { delay: 3, userId: 6 },
      ]
      // let index = 0
      const doRequest = ({ delay, userId }) =>
        ajax(`https://reqres.in/api/users/${userId}?delay=${delay}`)
      // When
      const promise = shortestRequest(button, doRequest, requests)
      requests.forEach(() => {
        button.click()
      })
      const body = await promise
      // Then
      expect(body).toEqual({
        avatar: 'https://reqres.in/img/faces/3-image.jpg',
        email: 'emma.wong@reqres.in',
        first_name: 'Emma',
        id: 3,
        last_name: 'Wong',
      })
    })
  })
  describe('movieReviews', () => {
    let movieReviews
    beforeAll(async () => {
      ;({ movieReviews } = reactiveUtils)
    })
    test('should return reviews of movies given a director', async () => {
      // Given
      const baseUrl = 'http://www.maciejtreder.com/asynchronous-javascript'
      const restConfig = {
        baseUrl,
        directorsUri: `${baseUrl}/directors`,
        moviesUri: (directorId) => `${baseUrl}/directors/${directorId}/movies`,
        reviewsUri: (movieId) => `${baseUrl}/movies/${movieId}/reviews`,
      }
      const directorName = 'Quentin Tarantino'
      // When
      const result = await movieReviews(restConfig, directorName)
      // Then
      expect(result).toEqual('Inglourious Basterds')
    })
  })
})
