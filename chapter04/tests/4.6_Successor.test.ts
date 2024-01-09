import { expect, test } from 'bun:test'
import { BinaryTreeA, BinaryTreeB } from '../util/lib'
import { findSuccessor, inroderSuccessor } from '@code/4.6_Successor'

console.log('BinaryTreeA: ', BinaryTreeA.inOrderOutput())
console.log('BinaryTreeB: ', BinaryTreeB.inOrderOutput())

test('4.6 Successor', () => {
  expect(findSuccessor(BinaryTreeA, 1)?.value).toBe(2)
  expect(findSuccessor(BinaryTreeA, 2)?.value).toBe(3)
  expect(findSuccessor(BinaryTreeA, 3)?.value).toBe(4)
  expect(findSuccessor(BinaryTreeA, 4)?.value).toBe(5)
  expect(findSuccessor(BinaryTreeA, 5)?.value).toBe(6)
  expect(findSuccessor(BinaryTreeA, 6)?.value).toBe(7)
  expect(findSuccessor(BinaryTreeA, 7)?.value).toBe(undefined)
})

// BinaryTreeA:
//        4
//    2       6
//  1   3   5   7
// BinaryTreeB:
//        5
//    2       6
//  1   3       6
// 0   2 3        8
//        4
test('4.6 Successor solution', () => {
  expect(inroderSuccessor(BinaryTreeA.get(1))?.value).toBe(2)
  expect(inroderSuccessor(BinaryTreeA.get(4))?.value).toBe(5)
  expect(inroderSuccessor(BinaryTreeA.get(7))?.value).toBe(undefined)

  expect(inroderSuccessor(BinaryTreeB.get(0))?.value).toBe(1)
  expect(inroderSuccessor(BinaryTreeB.get(4))?.value).toBe(5)
  expect(inroderSuccessor(BinaryTreeB.get(6))?.value).toBe(6)
  expect(inroderSuccessor(BinaryTreeB.get(4))?.value).toBe(5)
  expect(inroderSuccessor(BinaryTreeB.get(8))?.value).toBe(undefined)
})
