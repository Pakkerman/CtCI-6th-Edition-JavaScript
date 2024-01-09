import { expect, test } from 'bun:test'
import { BinaryTreeA, BinaryTreeB, BinaryTreeC, BinaryTreeD } from '../util/lib'
import { isValidBST } from '@code/4.5_ValidateBST'
import { BST } from '../util/BST'

test('4.5 Validate BST', () => {
  expect(isValidBST(new BST<number>())).toBe(true) // empty tree is valid BST
  console.log('testing TreeA')
  expect(isValidBST(BinaryTreeA)).toBe(true)
  console.log('testing TreeB')
  expect(isValidBST(BinaryTreeB)).toBe(true)
  console.log('testing TreeC')
  expect(isValidBST(BinaryTreeC)).toBe(false)
  console.log('testing TreeD')
  expect(isValidBST(BinaryTreeD)).toBe(false)
})
