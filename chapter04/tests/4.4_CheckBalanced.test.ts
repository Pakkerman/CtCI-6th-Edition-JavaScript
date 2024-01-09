import { expect, test } from 'bun:test'
import { BinaryTreeA, BinaryTreeB } from '../util/lib'
import { isBalanced } from '@code/4.4_CheckBalanced'

test('4.4 Check Balanced, testing a balanced tree', () => {
  expect(isBalanced(BinaryTreeA)).toBe(true)
})
test('4.4 Check Balanced testing a unbalanced tree', () => {
  expect(isBalanced(BinaryTreeB)).toBe(false)
})
