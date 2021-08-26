import { basename } from 'path'

/**
 * @group sync
 * @group easy
 */

const modName = basename(__filename, '.test.js')

describe('linked list', () => {
  let LinkedList
  let list
  beforeAll(async () => {
    ;({ LinkedList } = await import(`../main/${modName}`))
  })
  beforeEach(() => {
    // Given
    list = new LinkedList()
  })
  test('should pop the last element from the list and return it', () => {
    // When
    list.push(7)
    const result = list.pop()
    // Then
    expect(result).toBe(7)
  })
  test('should push/pop respectively add/remove at the end of the list', () => {
    // When
    list.push(11)
    list.push(13)
    const [result1, result2] = [list.pop(), list.pop()]
    // Then
    expect(result1).toBe(13)
    expect(result2).toBe(11)
  })
  test('should shift and get element from the list', () => {
    // When
    list.push(17)
    const result = list.shift()
    // Then
    expect(result).toBe(17)
  })
  test('should shift and get first element from the list', () => {
    // When
    list.push(23)
    list.push(5)
    const [result1, result2] = [list.shift(), list.shift()]
    // Then
    expect(result1).toBe(23)
    expect(result2).toBe(5)
  })
  test('should unshift and add element at the start of the list', () => {
    // When
    list.unshift(23)
    list.unshift(5)
    const [result1, result2] = [list.shift(), list.shift()]
    // Then
    expect(result1).toBe(5)
    expect(result2).toBe(23)
  })
  test('should pop, push, shift, and unshift can be used in any order', () => {
    // When
    list.push(1)
    list.push(2)
    const result1 = list.pop()
    list.push(3)
    const result2 = list.shift()
    list.unshift(4)
    list.push(5)
    const [result3, result4, result5] = [list.shift(), list.pop(), list.shift()]
    // Then
    expect(result1).toBe(2)
    expect(result2).toBe(1)
    expect(result3).toBe(4)
    expect(result4).toBe(5)
    expect(result5).toBe(3)
  })
  test('should return the count of an empty list', () => {
    // When
    const result = list.count()
    // Then
    expect(result).toBe(0)
  })
  test('should return count of list with items', () => {
    // When
    list.push(37)
    list.push(1)
    const result = list.count()
    // Then
    expect(result).toBe(2)
  })
  test('should return correct count after mutation', () => {
    // When
    list.push(31)
    const result1 = list.count()
    list.unshift(43)
    const result2 = list.count()
    list.shift()
    const result3 = list.count()
    list.pop()
    const result4 = list.count()
    // Then
    expect(result1).toBe(1)
    expect(result2).toBe(2)
    expect(result3).toBe(1)
    expect(result4).toBe(0)
  })
  test('should pop to empty and do not break the list', () => {
    // When
    list.push(41)
    list.push(59)
    list.pop()
    list.pop()
    list.push(47)
    const [result1, result2] = [list.count(), list.pop()]
    // Then
    expect(result1).toBe(1)
    expect(result2).toBe(47)
  })
  test('should shift to empty and do not break the list', () => {
    // When
    list.push(41)
    list.push(59)
    list.shift()
    list.shift()
    list.push(47)
    const [result1, result2] = [list.count(), list.shift()]
    // Then
    expect(result1).toBe(1)
    expect(result2).toBe(47)
  })
  test('should delete the only element', () => {
    // When
    list.push(61)
    list.delete(61)
    const result = list.count()
    // Then
    expect(result).toBe(0)
  })
  test('should delete the element with the specified value from the list', () => {
    // When
    list.push(71)
    list.push(83)
    list.push(79)
    list.delete(83)
    const [result1, result2, result3] = [list.count(), list.pop(), list.shift()]
    // Then
    expect(result1).toBe(2)
    expect(result2).toBe(79)
    expect(result3).toBe(71)
  })
  test('should delete the element with the specified value from the list, and re-assign tail', () => {
    // When
    list.push(71)
    list.push(83)
    list.push(79)
    list.delete(83)
    const [result1, result2, result3] = [list.count(), list.pop(), list.pop()]
    // Then
    expect(result1).toBe(2)
    expect(result2).toBe(79)
    expect(result3).toBe(71)
  })
  test('should delete the element with the specified value from the list, and re-assign head', () => {
    // When
    list.push(71)
    list.push(83)
    list.push(79)
    list.delete(83)
    const [result1, result2, result3] = [list.count(), list.shift(), list.shift()]
    // Then
    expect(result1).toBe(2)
    expect(result2).toBe(71)
    expect(result3).toBe(79)
  })
  test('should delete the first of two elements', () => {
    // When
    list.push(97)
    list.push(101)
    list.delete(97)
    const [result1, result2] = [list.count(), list.pop()]
    // Then
    expect(result1).toBe(1)
    expect(result2).toBe(101)
  })
  test('should delete the second of two elements', () => {
    // When
    list.push(97)
    list.push(101)
    list.delete(101)
    const [result1, result2] = [list.count(), list.pop()]
    // Then
    expect(result1).toBe(1)
    expect(result2).toBe(97)
  })
  test('should delete and do not modify the list if the element is not found', () => {
    // When
    list.push(89)
    list.delete(103)
    const result = list.count()
    // Then
    expect(result).toBe(1)
  })
  test('should delete only the first occurence', () => {
    // When
    list.push(73)
    list.push(9)
    list.push(9)
    list.push(107)
    list.delete(9)
    const [result1, result2, result3, result4] = [list.count(), list.pop(), list.pop(), list.pop()]
    // Then
    expect(result1).toBe(3)
    expect(result2).toBe(107)
    expect(result3).toBe(9)
    expect(result4).toBe(73)
  })
})
