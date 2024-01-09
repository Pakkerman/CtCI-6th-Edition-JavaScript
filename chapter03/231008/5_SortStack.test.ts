import { expect, test } from 'bun:test'
import { SortStack } from './5_SortStack'

const s = new SortStack()

test('test', () => {
  s.push(0)
  s.push(1)
  s.push(2)
  expect(s.size()).toBe(3)

  expect(s.pop()).toBe(0)
  s.push(Infinity)
  expect(s.size()).toBe(3)

  expect(s.pop()).toBe(1)
  expect(s.pop()).toBe(2)
  expect(s.pop()).toBe(Infinity)
  expect(s.size()).toBe(0)

  s.push(5)
  s.push(7)
  s.push(9)
  s.push(0)
  expect(s.size()).toBe(4)
  expect(s.peek()).toBe(0)
  s.push(-1)
  expect(s.size()).toBe(5)
  expect(s.peek()).toBe(-1)

  s.print()
})
