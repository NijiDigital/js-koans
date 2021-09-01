import { basename } from 'path'

/**
 * @level 2
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('rectangular frame', () => {
  let rectangularFrame
  beforeAll(async () => {
    ;({ rectangularFrame } = await import(`../main/${modName}`))
  })
  describe('rectangularFrame', () => {
    test.each([
      {
        expectedResult: [
          '************',
          '* Aliquam  *',
          '* sit amet *',
          '* justo in *',
          '************',
        ].join('\n'),
        lines: ['Aliquam', 'sit amet', 'justo in'],
      },
      {
        expectedResult: [
          '*********',
          '* Hello *',
          '* World *',
          '* in    *',
          '* a     *',
          '* frame *',
          '*********',
        ].join('\n'),
        lines: ['Hello', 'World', 'in', 'a', 'frame'],
      },
    ])(
      'should return a rectangular frame string given lines $lines',
      ({ expectedResult, lines }) => {
        const result = rectangularFrame(lines)
        expect(result).toEqual(expectedResult)
      },
    )
  })
})
