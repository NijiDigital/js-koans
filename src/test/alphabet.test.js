import { basename } from 'path'

/**
 * @level 2
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('alphabet', () => {
  describe('buildLetters', () => {
    let buildLetters
    beforeAll(async () => {
      ;({ buildLetters } = await import(`../main/${modName}`))
    })
    test('should return a string with all letters of alphabet', () => {
      // When
      const result = buildLetters()
      // Then
      expect(result).toEqual('abcdefghijklmnopqrstuvwxyz')
    })
    test.each([
      { expectedResult: 'cdefghijklmnopqrstuvwx', from: 'c', to: 'x' },
      { expectedResult: 'ghijklm', from: 'g', to: 'm' },
      { expectedResult: 'opqrstuvwxyz', from: 'o', to: undefined },
      { expectedResult: 'ABCDEFGHIJK', from: 'A', to: 'K' },
    ])(
      'should return $expectedResult given from=$from and to=$to',
      ({ expectedResult, from, to }) => {
        // When
        const result = buildLetters(from, to)
        // Then
        expect(result).toEqual(expectedResult)
      },
    )
  })
})
