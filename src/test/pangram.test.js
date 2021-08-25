import { basename } from 'path'

/**
 * @group sync
 * @group easy
 */

const modName = basename(__filename, '.test.js')

describe('pangram', () => {
  describe('isPangram', () => {
    let isPangram
    beforeAll(async () => {
      ;({ isPangram } = await import(`../main/${modName}`))
    })
    test.each([
      {
        desc: 'empty sentence',
        expectedResult: false,
        s: '',
      },
      {
        desc: 'perfect lower case',
        expectedResult: true,
        s: 'abcdefghijklmnopqrstuvwxyz',
      },
      {
        desc: 'only lower case',
        expectedResult: true,
        s: 'the quick brown fox jumps over the lazy dog',
      },
      {
        desc: "missing the letter 'x'",
        expectedResult: false,
        s: 'a quick movement of the enemy will jeopardize five gunboats',
      },
      {
        desc: "missing the letter 'h'",
        expectedResult: false,
        s: 'five boxing wizards jump quickly at it',
      },
      {
        desc: 'with underscores',
        expectedResult: true,
        s: 'the_quick_brown_fox_jumps_over_the_lazy_dog',
      },
      {
        desc: 'with numbers',
        expectedResult: true,
        s: 'the 1 quick brown fox jumps over the 2 lazy dogs',
      },
      {
        desc: 'missing letters replaced by numbers',
        expectedResult: false,
        s: '7h3 qu1ck brown fox jumps ov3r 7h3 lazy dog',
      },
      {
        desc: 'mixed case and punctuation',
        expectedResult: true,
        s: '"Five quacking Zephyrs jolt my wax bed."',
      },
      {
        desc: 'case insensitive',
        expectedResult: false,
        s: 'the quick brown fox jumps over with lazy FX',
      },
    ])('$desc', ({ expectedResult, s }) => {
      // When
      const result = isPangram(s)
      // Then
      expect(result).toBe(expectedResult)
    })
  })
})
