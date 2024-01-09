import { expect, test } from 'bun:test'
import { Plates } from './3_StackOfPlates'

const p = new Plates()

test('push() / pop() operation', () => {
  p.push(5)
  p.push(5)
  p.push(5)
  expect(p.pop()).toBe(5)
  expect(p.pop()).toBe(5)
  expect(p.pop()).toBe(5)
})

test('popAt() operation', () => {
  p.push(5)
  p.push(5)
  p.push(2)
  p.push(5)
  expect(p.popAt(0)).toBe(2)
  expect(p.popAt(0)).toBe(5)
})

test('handle length correctly', () => {
  expect(p.length).toBe(2)
})
