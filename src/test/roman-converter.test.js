import { basename } from 'path'

/**
 * @group sync
 * @group easy
 */

const modName = basename(__filename, '.test.js')

describe('roman converter', () => {
  const usecases = [
    { arabic: 1, roman: 'I' },
    { arabic: 4, roman: 'IV' },
    { arabic: 9, roman: 'IX' },
    { arabic: 28, roman: 'XXVIII' },
    { arabic: 49, roman: 'XLIX' },
    { arabic: 99, roman: 'XCIX' },
    { arabic: 136, roman: 'CXXXVI' },
    { arabic: 499, roman: 'CDXCIX' },
    { arabic: 999, roman: 'CMXCIX' },
    { arabic: 3777, roman: 'MMMDCCLXXVII' },
  ]
  let mod
  beforeAll(async () => {
    mod = await import(`../main/${modName}`)
  })
  describe('arabicNumberToRoman', () => {
    let arabicNumberToRoman
    beforeAll(() => {
      ;({ arabicNumberToRoman } = mod)
    })
    test('should throw a "not supported" error given 0', () => {
      // When
      const fn = () => {
        arabicNumberToRoman(0)
      }
      // Then
      expect(fn).toThrow('not supported')
    })
    test.each(usecases)('should return $roman given $arabic', ({ arabic, roman }) => {
      let result = arabicNumberToRoman(arabic)
      expect(result).toBe(roman)
    })
  })
  describe('romanNumberToArabic', () => {
    let romanNumberToArabic
    beforeAll(() => {
      ;({ romanNumberToArabic } = mod)
    })
    test("should throw a 'not supported' error given ''", () => {
      // When
      const fn = () => {
        romanNumberToArabic('')
      }
      // Then
      expect(fn).toThrow('not supported')
    })
    test("should throw a 'not supported' error given 'IIZ'", () => {
      // When
      const fn = () => {
        romanNumberToArabic('IIZ')
      }
      // Then
      expect(fn).toThrow('not supported')
    })
    test.each(usecases)('should return $arabic given $roman', ({ arabic, roman }) => {
      let result = romanNumberToArabic(roman)
      expect(result).toBe(arabic)
    })
  })
})
