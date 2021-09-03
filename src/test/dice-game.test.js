import { basename } from 'path'

/**
 * @factor 2
 * @level 3
 * @tags sync, classes, oop
 */

const modName = basename(__filename, '.test.js')

describe('dice game', () => {
  let mod
  beforeAll(async () => {
    mod = await import(`../main/${modName}`)
  })
  describe('createDice', () => {
    let createDice
    beforeAll(() => {
      ;({ createDice } = mod)
    })
    test('should save given value for each instance of Dice', () => {
      // Given
      const d1 = createDice(1)
      const d2 = createDice(3)
      expect(d1.value).toBe(1)
      expect(d2.value).toBe(3)
    })
    describe('dice instance', () => {
      let dice
      beforeAll(() => {
        dice = createDice()
      })
      test('should have a value property set to a random integer between 1 and 6', () => {
        expect(dice).toHaveProperty('value')
        expect(dice.value).toBeGreaterThanOrEqual(1)
        expect(dice.value).toBeLessThanOrEqual(6)
      })
      describe('roll', () => {
        test('should expose a roll method', () => {
          expect(dice).toHaveProperty('roll')
          expect(typeof dice.roll).toBe('function')
        })
        test('should roll the dice 100 times and set its value to a random integer between 1 and 6', () => {
          // When
          const alwaysSameValue = Array.from(Array(100)).reduce((same) => {
            const oldValue = dice.value
            dice.roll()
            expect(dice.value).toBeGreaterThanOrEqual(1)
            expect(dice.value).toBeLessThanOrEqual(6)
            return same && dice.value === oldValue
          }, true)
          // Then
          expect(alwaysSameValue).toBe(false)
        })
        test('should expose a readonly value', () => {
          const oldValue = dice.value
          const newValue = (oldValue % 6) + 1
          const failingFn = () => {
            dice.value = newValue
          }
          expect(failingFn).toHaveFailedWith({
            message: 'Cannot set property value of #<Dice> which has only a getter',
            type: Error,
          })
          expect(dice.value).toBe(oldValue)
        })
      })
    })
    describe('createPlayer', () => {
      let createPlayer
      beforeAll(() => {
        ;({ createPlayer } = mod)
      })
      test('should save given name for each instance of Player', () => {
        // Given
        const bob = createPlayer('Bob')
        const jane = createPlayer('Jane')
        expect(bob.name).toBe('Bob')
        expect(jane.name).toBe('Jane')
      })
      describe('players', () => {
        let players
        beforeAll(() => {
          players = [createPlayer('Bob'), createPlayer('Jane')]
        })
        test('should have name and score properties set to initial values', () => {
          expect(players[0]).toHaveProperty('name', 'Bob')
          expect(players[0]).toHaveProperty('score', 0)
          expect(players[1]).toHaveProperty('name', 'Jane')
          expect(players[1]).toHaveProperty('score', 0)
        })
        describe('play', () => {
          let dices
          beforeAll(() => {
            dices = [createDice(), createDice()]
          })
          test('should expose a play method', () => {
            players.forEach((player) => {
              expect(player).toHaveProperty('play')
              expect(typeof player.play).toBe('function')
            })
          })
          test('should play 10 rounds with dices and update each player score', () => {
            players.forEach((player) => {
              expect(player.score).toBe(0)
            })
            Array.from(Array(10)).forEach(() => {
              players.forEach((player) => {
                const oldScore = player.score
                player.play(dices[0], dices[1])
                expect(player.score).toBe(oldScore + dices[0].value + dices[1].value)
              })
            })
          })
          test('should expose readonly name', () => {
            players.forEach((player) => {
              const oldName = player.name
              const newName = `${oldName} Junior`
              const failingFn = () => {
                player.name = newName
              }
              expect(failingFn).toHaveFailedWith({
                message: 'Cannot set property name of #<Player> which has only a getter',
                type: Error,
              })
              expect(player.name).toBe(oldName)
            })
          })
          test('should expose readonly score', () => {
            players.forEach((player) => {
              const oldScore = player.score
              const newScore = oldScore * 10
              const failingFn = () => {
                player.score = newScore
              }
              expect(failingFn).toHaveFailedWith({
                message: 'Cannot set property score of #<Player> which has only a getter',
                type: Error,
              })
              expect(player.score).toBe(oldScore)
            })
          })
        })
      })
      describe('loaded dice', () => {
        let dice
        beforeAll(() => {
          dice = createDice(6, true)
        })
        test('should roll the dice 100 times and set its value to a random integer between 1 and 6', () => {
          // When
          const alwaysSameValue = Array.from(Array(100)).reduce((same) => {
            const oldValue = dice.value
            dice.roll()
            expect(dice.value).toBeGreaterThanOrEqual(1)
            expect(dice.value).toBeLessThanOrEqual(6)
            return same && dice.value === oldValue
          }, true)
          // Then
          expect(alwaysSameValue).toBe(false)
        })
        describe('play with loaded dices', () => {
          let dices, player
          beforeAll(() => {
            dices = [createDice(6, true), createDice(6, true)]
            player = createPlayer('Bob')
          })
          test('should play 10 rounds with dices and give a score greater or equal to 60 given 2 loaded dices set to 6', () => {
            Array.from(Array(10)).forEach(() => {
              player.play(dices[0], dices[1])
            })
            expect(player.score).toBeGreaterThanOrEqual(70)
          })
        })
      })
    })
  })
})
