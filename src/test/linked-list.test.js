import { basename } from 'path'

/**
 * @level 2
 * @tags sync
 */

const modName = basename(__filename, '.test.js')

describe('linked list', () => {
  let LinkedList
  beforeAll(async () => {
    ;({ LinkedList } = await import(`../main/${modName}`))
  })
  describe('instance', () => {
    let linkedList
    beforeEach(() => {
      // Given
      linkedList = new LinkedList()
    })
    describe('add', () => {
      test('should add values at the end', () => {
        // When
        linkedList.add(7)
        linkedList.add(3)
        linkedList.add(5)
        linkedList.add(4)
        // Then
        const head = linkedList.getHead()
        let node = head
        const result = []
        while (node) {
          result.push(node.value)
          node = node.getNext()
        }
        expect(result).toEqual([7, 3, 5, 4])
      })
    })
    describe('isEmpty', () => {
      test('should return true if linked list has no value', () => {
        // When
        const result = linkedList.isEmpty()
        // Then
        expect(result).toBe(true)
      })
      test('should return false if linked list has at least one value', () => {
        // Given
        linkedList.add(4)
        // When
        const result = linkedList.isEmpty()
        // Then
        expect(result).toBe(false)
      })
    })
    describe('toArray', () => {
      test('should add values and return the values list as an array', () => {
        // Given
        linkedList.add(7)
        linkedList.add(3)
        linkedList.add(5)
        linkedList.add(4)
        // When
        const result = linkedList.toArray()
        // Then
        expect(result).toEqual([7, 3, 5, 4])
      })
    })
  })
})
