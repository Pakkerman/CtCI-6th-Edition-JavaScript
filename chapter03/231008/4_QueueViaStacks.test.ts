import { expect, test } from 'bun:test'
import { MyQueue } from './4_QueueViaStacks'

const q = new MyQueue()

test('enque and deque', () => {
  q.enque(1)
  q.enque(2)
  q.enque(3)
  expect(q.deque()).toBe(1)
  expect(q.deque()).toBe(2)
  expect(q.deque()).toBe(3)
  q.enque(3)
  expect(q.length).toBe(1)
  expect(q.deque()).toBe(3)
  expect(q.length).toBe(0)

  q.enque(1)
  q.enque(2)
  expect(q.length).toBe(2)
  expect(q.deque()).toBe(1)
  q.enque(3)
  expect(q.deque()).toBe(2)
  expect(q.deque()).toBe(3)

  expect(q.length).toBe(0)
  expect(q.deque()).toBe(undefined)
  expect(q.length).toBe(0)
  expect(q.deque()).toBe(undefined)
})
