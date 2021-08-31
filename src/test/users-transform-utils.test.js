import { basename } from 'path'

/**
 * @level 2
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('users transform utils', () => {
  describe('addColorToUsersMap', () => {
    let addColorToUsersMap
    beforeAll(async () => {
      ;({ addColorToUsersMap } = await import(`../main/${modName}`))
    })
    test('should add matching color to users map', () => {
      // Given
      const contacts = new Map([
        [
          'jod',
          {
            firstName: 'John',
            id: 'jod',
            lastName: 'Doe',
          },
        ],
        [
          'rog',
          {
            firstName: 'Robert',
            id: 'rog',
            lastName: 'Glasper',
          },
        ],
        [
          'jad',
          {
            firstName: 'Jane',
            id: 'jad',
            lastName: 'Doe',
          },
        ],
      ])
      const names = ['jod', 'jad', 'rog']
      const colors = ['#0171bd', '#f50303', '#41a72b']
      const expectedResult = {
        jad: { color: '#f50303', firstName: 'Jane', lastName: 'Doe' },
        jod: { color: '#0171bd', firstName: 'John', lastName: 'Doe' },
        rog: { color: '#41a72b', firstName: 'Robert', lastName: 'Glasper' },
      }
      // When
      const result = addColorToUsersMap(contacts, names, colors)
      // Then
      expect(result).toEqual(expectedResult)
    })
  })
})
