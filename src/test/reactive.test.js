import { basename } from 'path'
import { ajax } from 'rxjs/ajax'

/**
 * @level 3
 * @tags async
 */

const modName = basename(__filename, '.test.js')

describe('reactive', () => {
  let mod
  beforeAll(async () => {
    mod = await import(`../main/${modName}`)
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
  describe('changeOn3rdClick', () => {
    let changeOn3rdClick
    beforeAll(async () => {
      ;({ changeOn3rdClick } = mod)
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
  describe('crawl', () => {
    jest.setTimeout(10000)
    let shortestRequest
    beforeAll(async () => {
      ;({ shortestRequest } = mod)
    })
    test('should get response data of the shortest http request', async () => {
      // Given
      const requests = [
        { delay: 2, userId: 1 },
        { delay: 1, userId: 3 },
        { delay: 3, userId: 6 },
      ]
      // let index = 0
      const doRequest = ({ delay, userId }) => {
        return ajax(`https://reqres.in/api/users/${userId}?delay=${delay}`)
      }
      // When
      const promise = shortestRequest(button, doRequest, requests)
      requests.forEach(() => {
        button.click()
      })
      const response = await promise
      // Then
      expect(response).toEqual({
        avatar: 'https://reqres.in/img/faces/3-image.jpg',
        email: 'emma.wong@reqres.in',
        first_name: 'Emma',
        id: 3,
        last_name: 'Wong',
      })
    })
  })
})
