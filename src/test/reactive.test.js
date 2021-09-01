import { basename } from 'path'
import { when } from 'jest-when'

/**
 * @level 3
 * @tags async
 */

const modName = basename(__filename, '.test.js')

describe('reactive', () => {
  let changeOn3rdClick
  beforeAll(async () => {
    ;({ changeOn3rdClick } = await import(`../main/${modName}`))
  })
  describe('changeOn3rdClick', () => {
    test('should change output text when button is clicked 3 times', () => {
      // Given
      const button = {
        addEventListener: jest.fn().mockImplementation((__, listener) => {
          button.listener = listener
        }),
        click: () => {
          if (button.listener) {
            button.listener()
          }
        },
      }
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
})
