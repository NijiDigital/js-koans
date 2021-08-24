import { basename } from 'path'

/**
 * @group sync
 * @group hard
 */

const modName = basename(__filename, '.test.js')

describe('bowling kata', () => {
  let Game
  let game
  const expectFirstPlayerScore = (expectedScore) => {
    expect(game.getPlayerScore(1)).toBe(expectedScore)
  }
  const rollMany = (rolls, pins) => {
    Array.from(Array(rolls)).forEach(() => {
      game.roll(pins)
    })
  }
  const rollSpare = () => {
    game.roll(5)
    game.roll(5)
  }
  const rollStrike = () => {
    game.roll(10)
  }
  const rollSome = (rolls, ...args) => {
    ;(Array.isArray(rolls) ? rolls : [rolls, ...args]).forEach((item) => {
      game.roll(item)
    })
  }
  const rollAndAssertFirstPlayerScore = (rolls, expectedScore) => {
    rollSome(rolls)
    if (expectedScore) {
      expectFirstPlayerScore(expectedScore)
    }
  }
  const expectScore = (expectedScore, playerIndex) => {
    expect(game.getPlayerScore(playerIndex)).toBe(expectedScore)
  }
  const rollAndAssertScore = (rolls, expectedScore, playerIndex) => {
    rollSome(rolls)
    if (expectedScore) {
      expectScore(expectedScore, playerIndex)
    }
  }

  beforeEach(() => {
    game = new Game()
  })
  describe('one player game', () => {
    describe('step1', () => {
      beforeAll(async () => {
        ;({ step1: Game } = await import(`../main/${modName}`))
      })
      test('should provide a Game instance', () => {
        expect(game).toBeTruthy()
        expect(game).toBeInstanceOf(Game)
      })
    })
    describe('step2', () => {
      beforeAll(async () => {
        ;({ step2: Game } = await import(`../main/${modName}`))
      })
      beforeEach(() => {
        game.init(1)
      })
      describe('simple rolls', () => {
        test('should score 0, 1 roll is 0', () => {
          game.roll(0)
          expect(game.getPlayerScore(1)).toBe(0)
        })
      })
    })
    describe('step3', () => {
      describe('multiple rolls', () => {
        beforeAll(async () => {
          ;({ step3: Game } = await import(`../main/${modName}`))
        })
        beforeEach(() => {
          game.init(1)
        })
        test('should score 0, 20 rolls are 0', () => {
          rollMany(20, 0)
          expectFirstPlayerScore(0)
        })
        test('should score 20, 20 rolls are 1', () => {
          rollMany(20, 1)
          expectFirstPlayerScore(20)
        })
      })
    })
    describe('step4', () => {
      beforeAll(async () => {
        ;({ step4: Game } = await import(`../main/${modName}`))
      })
      beforeEach(() => {
        game.init(1)
      })
      describe('spares', () => {
        test('should score 20 given the first 3 rolls hit 5 pins', () => {
          rollSpare()
          game.roll(5)
          rollMany(17, 0)
          expectFirstPlayerScore(20)
        })
        test('should score 29, 1 spare and 18 rolls are 1', () => {
          rollSpare()
          rollMany(18, 1)
          expectFirstPlayerScore(29)
        })
      })
    })
    describe('step5', () => {
      beforeAll(async () => {
        ;({ step5: Game } = await import(`../main/${modName}`))
      })
      beforeEach(() => {
        game.init(1)
      })
      describe('strikes', () => {
        test('should score 30, 1 strike and 18 rolls are 1', () => {
          game.roll(10)
          rollMany(18, 1)
          expectFirstPlayerScore(30)
        })
        test('should score 20, 1 strike and 2 rolls hitting 2 & 3 pins', () => {
          game.roll(10)
          game.roll(2)
          game.roll(3)
          rollMany(16, 0)
          expectFirstPlayerScore(20)
        })
      })
    })
    describe('step6', () => {
      beforeAll(async () => {
        ;({ step6: Game } = await import(`../main/${modName}`))
      })
      beforeEach(() => {
        game.init(1)
      })
      describe('bonus roll', () => {
        test('should score 300 for 12 strikes in a row', () => {
          rollMany(12, 10)
          expectFirstPlayerScore(300)
        })
      })
      describe('scenarii', () => {
        test('should score 82, John simple, strikes & spares ommited', () => {
          game.init(['John'])
          rollAndAssertFirstPlayerScore([9, 0], 9)
          rollAndAssertFirstPlayerScore([3, 5], 17)
          rollAndAssertFirstPlayerScore([6, 1], 24)
          rollAndAssertFirstPlayerScore([3, 6], 33)
          rollAndAssertFirstPlayerScore([8, 1], 42)
          rollAndAssertFirstPlayerScore([5, 3], 50)
          rollAndAssertFirstPlayerScore([2, 5], 57)
          rollAndAssertFirstPlayerScore([8, 0], 65)
          rollAndAssertFirstPlayerScore([7, 1], 73)
          rollAndAssertFirstPlayerScore([8, 1], 82)
        })
        test('should score 131, Mary scenario with spares', () => {
          game.init(['John'])
          rollAndAssertFirstPlayerScore([9, 0], 9)
          rollAndAssertFirstPlayerScore([3, 7], 19)
          rollAndAssertFirstPlayerScore([6, 1], 32)
          rollAndAssertFirstPlayerScore([3, 7], 42)
          rollAndAssertFirstPlayerScore([8, 1], 59)
          rollAndAssertFirstPlayerScore([5, 5], 69)
          rollAndAssertFirstPlayerScore([0, 10], 79)
          rollAndAssertFirstPlayerScore([8, 0], 95)
          rollAndAssertFirstPlayerScore([7, 3], 105)
          rollAndAssertFirstPlayerScore([8, 2, 8], 131)
        })
        test('should score 131, Kim scenario with strikes', () => {
          game.init(['Kim'])
          rollAndAssertFirstPlayerScore([10], 10)
          rollAndAssertFirstPlayerScore([3, 7], 30)
          rollAndAssertFirstPlayerScore([6, 1], 43)
          rollAndAssertFirstPlayerScore([10], 53)
          rollAndAssertFirstPlayerScore([10], 73)
          rollAndAssertFirstPlayerScore([10], 103)
          rollAndAssertFirstPlayerScore([2, 8], 125)
          rollAndAssertFirstPlayerScore([9, 0], 143)
          rollAndAssertFirstPlayerScore([7, 3], 153)
          rollAndAssertFirstPlayerScore([10], 173)
          rollAndAssertFirstPlayerScore([10], 183)
          rollAndAssertFirstPlayerScore([10], 193)
        })
        test('should score 110, with spares and strikes', () => {
          // frame 1, score: 9
          game.roll(7)
          game.roll(2)
          expectFirstPlayerScore(9)
          // frame 2, score: 16
          game.roll(6)
          game.roll(1)
          expectFirstPlayerScore(16)
          // frame 3, score: 26 + 3 = 29
          rollSpare()
          // frame 4, score: 36
          game.roll(3)
          expectFirstPlayerScore(32)
          game.roll(4)
          expectFirstPlayerScore(36)
          // frame 5, score: 46 + 10 = 56
          rollSpare()
          // frame 6, score: 66 + 5 + 3 = 74
          expectFirstPlayerScore(46)
          rollStrike()
          expectFirstPlayerScore(66)
          // frame 7, score: 82
          game.roll(5)
          game.roll(3)
          expectFirstPlayerScore(82)
          // frame 8, score: 87
          game.roll(5)
          game.roll(0)
          expectFirstPlayerScore(87)
          // frame 9, score: 95
          game.roll(6)
          game.roll(2)
          expectFirstPlayerScore(95)
          // frame 10, score: 105 + 5 = 110
          game.roll(7)
          game.roll(3)
          game.roll(5)
          expectFirstPlayerScore(110)
        })
      })
    })
  })
  describe('multi players game', () => {
    describe('step7', () => {
      beforeAll(async () => {
        ;({ step7: Game } = await import(`../main/${modName}`))
      })
      test('should provide a Game instance of a random number of players with default name', () => {
        const minPlayers = 3
        const maxPlayers = 10
        const noPlayers = Math.floor(Math.random() * (maxPlayers - minPlayers + 1) + minPlayers)
        game.init(noPlayers)
        expect(game.getNoPlayers()).toBe(noPlayers)
        for (let i = 1; i <= noPlayers; i++) {
          expect(game.getPlayerName(i)).toEqual(`Player${i}`)
        }
      })
    })
    describe('step8', () => {
      beforeAll(async () => {
        ;({ step8: Game } = await import(`../main/${modName}`))
      })
      test('should provide a Game instance of 5 players with specified name', () => {
        const players = ['john', 'jack', 'jennifer', 'robert', 'sarah']
        game.init(players)
        expect(game.getNoPlayers()).toBe(players.length)
        players.forEach((name, index) => {
          expect(game.getPlayerName(index + 1)).toEqual(name)
        })
      })
    })
    describe('step9', () => {
      beforeAll(async () => {
        ;({ step9: Game } = await import(`../main/${modName}`))
      })
      test('should score 82 for John, 131 for Mary & 193 for Kim', () => {
        game.init(['John', 'Mary', 'Kim'])
        rollAndAssertScore([9, 0], 9, 1)
        rollAndAssertScore([9, 0], 9, 2)
        rollAndAssertScore([10], 10, 3)
        //
        rollAndAssertScore([3, 5], 17, 1)
        rollAndAssertScore([3, 7], 19, 2)
        rollAndAssertScore([3, 7], 30, 3)
        //
        rollAndAssertScore([6, 1], 24, 1)
        rollAndAssertScore([6, 1], 32, 2)
        rollAndAssertScore([6, 1], 43, 3)
        //
        rollAndAssertScore([3, 6], 33, 1)
        rollAndAssertScore([3, 7], 42, 2)
        rollAndAssertScore([10], 53, 3)
        //
        rollAndAssertScore([8, 1], 42, 1)
        rollAndAssertScore([8, 1], 59, 2)
        rollAndAssertScore([10], 73, 3)
        //
        rollAndAssertScore([5, 3], 50, 1)
        rollAndAssertScore([5, 5], 69, 2)
        rollAndAssertScore([10], 103, 3)
        //
        rollAndAssertScore([2, 5], 57, 1)
        rollAndAssertScore([0, 10], 79, 2)
        rollAndAssertScore([2, 8], 125, 3)
        //
        rollAndAssertScore([8, 0], 65, 1)
        rollAndAssertScore([8, 0], 95, 2)
        rollAndAssertScore([9, 0], 143, 3)
        //
        rollAndAssertScore([7, 1], 73, 1)
        rollAndAssertScore([7, 3], 105, 2)
        rollAndAssertScore([7, 3], 153, 3)
        //
        rollAndAssertScore([8, 1], 82, 1)
        rollAndAssertScore([8, 2, 8], 131, 2)
        rollAndAssertScore([10, 10, 10], 193, 3)
      })
      test('should score 300 for each player, 12 strikes in a row', () => {
        game.init(2)
        rollMany(24, 10)
        expectScore(300, 1)
        expectScore(300, 2)
      })
      test('should score 300 for each player, 12 strikes in a row', () => {
        game.init(2)
        rollMany(24, 10)
        expectScore(300, 1)
        expectScore(300, 2)
      })
    })
  })
  describe('error handling', () => {
    describe('step10', () => {
      beforeAll(async () => {
        ;({ step10: Game } = await import(`../main/${modName}`))
      })
      test('should throw error : "expected a number"', () => {
        game.init(1)
        expect(() => {
          game.roll(null)
        }).toHaveFailedWith({ message: 'expected a number', type: Error })
      })
    })
    describe('step11', () => {
      beforeAll(async () => {
        ;({ step11: Game } = await import(`../main/${modName}`))
      })
      test('should throw error : "expected a number value in [0..10]"', () => {
        game.init(1)
        const tryRoll = (i) => () => {
          game.roll(i)
        }
        for (let i = -10; i < 0; i++) {
          expect(tryRoll(i)).toHaveFailedWith({
            message: 'expected a number value in [0..10]',
            type: Error,
          })
        }
        for (let i = 20; i > 10; i--) {
          expect(tryRoll(i)).toHaveFailedWith({
            message: 'expected a number value in [0..10]',
            type: Error,
          })
        }
      })
    })
    describe('step12', () => {
      beforeAll(async () => {
        ;({ step12: Game } = await import(`../main/${modName}`))
      })
      test('should throw error for bad number of players', () => {
        expect(() => {
          game.init(null)
        }).toHaveFailedWith({ message: 'expected a number for players', type: Error })
        expect(() => {
          game.init(0)
        }).toHaveFailedWith({ message: 'expected a positive number for players', type: Error })
        expect(() => {
          game.init(-1)
        }).toHaveFailedWith({ message: 'expected a positive number for players', type: Error })
        expect(() => {
          game.init([])
        }).toHaveFailedWith({ message: 'expected a positive number for players', type: Error })
      })
    })
    describe('step13', () => {
      beforeAll(async () => {
        ;({ step13: Game } = await import(`../main/${modName}`))
      })
      test('should throw error "game is over" after 10 frames', () => {
        game.init(1)
        rollMany(20, 1)
        expect(() => {
          game.roll(1)
        }).toHaveFailedWith({ message: 'game is over', type: Error })
        expect(() => {
          game.roll(1)
        }).toHaveFailedWith({ code: 1, message: 'game is over' })
      })
      test('should throw error "game is over" after 10 frames and 1 bonus roll', () => {
        game.init(1)
        rollMany(18, 1)
        rollStrike()
        rollMany(2, 1)
        expectFirstPlayerScore(30)
        expect(() => {
          game.roll(1)
        }).toHaveFailedWith({ message: 'game is over', type: Error })
      })
    })
  })
  describe('design quality', function () {
    describe('step14', () => {
      beforeAll(async () => {
        ;({ step14: Game } = await import(`../main/${modName}`))
      })
      test('should expose only needed props', () => {
        const expectedProps = ['players', 'currentPlayerIndex', 'currentFrameIndex'].sort()
        const props = Object.keys(game).sort()
        expect(props).toEqual(expectedProps)
      })
      test('should provide useful methods', () => {
        const expectedMethods = [
          'constructor',
          'init',
          'roll',
          'getNoPlayers',
          'getPlayerName',
          'getPlayerScore',
          'refreshCurrentScore',
        ].sort()
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(game)).sort()
        expect(methods).toEqual(expectedMethods)
        expectedMethods.forEach(function (methodName) {
          expect(typeof game[methodName]).toBe('function')
        })
      })
      test('should return true if end of game', () => {
        game.init(1)
        Array.from(Array(19)).forEach(() => {
          const endOfGame = game.roll(0)
          expect(endOfGame).toBe(false)
        })
        const endOfGame = game.roll(0)
        expect(endOfGame).toBe(true)
      })
    })
  })
})
