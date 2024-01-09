import { expect, test } from 'bun:test'
import { createWithBFS, createWithDFS } from '@code/4.3_ListOfDepths'
import { BinaryTreeA } from '../util/lib'
import { BinaryTree, TreeNode } from '../util/BinaryTree'
import { BST } from '../util/BST'

// input
//        4
//    2       6
//  1   3   5   7
// output
//       4
//    2  >>>  6
//  1 > 3 > 5 > 7

test('Test DFS', () => {
  // expect(CreateWithBFS(BS)).toEqual(output)
  const out = createWithDFS(BinaryTreeA)
  expect(out[0].get(0)?.value).toBe(4) // first level first node, the root should be 4
  expect(out[1].get(0)?.value).toBe(2) // second level first node, should be 2
  expect(out[1].get(1)?.value).toBe(6) // seconde level second node, should be 6
  expect(out[2].get(0)?.value).toBe(1) // third level first node, should be 1...
  expect(out[2].get(1)?.value).toBe(3) // and blah blah blah...
  expect(out[2].get(2)?.value).toBe(5)
  expect(out[2].get(3)?.value).toBe(7)

  // testing a imbalanced tree
  // const tree = new BST<number>([5])
  // tree.root.left = new TreeNode<number>(4)
  // tree.root.left.left = new TreeNode<number>(3)
  // tree.root.left.left.left = new TreeNode<number>(2)
  // tree.root.left.left.left.left = new TreeNode<number>(1)
})

test('Test BFS', () => {
  const out = createWithBFS(BinaryTreeA)

  expect(out[0].get(0)?.value).toBe(4) // first level first node, the root should be 4
  expect(out[1].get(0)?.value).toBe(2) // second level first node, should be 2
  expect(out[1].get(1)?.value).toBe(6) // seconde level second node, should be 6
  expect(out[2].get(0)?.value).toBe(1) // third level first node, should be 1...
  expect(out[2].get(1)?.value).toBe(3) // and blah blah blah...
  expect(out[2].get(2)?.value).toBe(5)
  expect(out[2].get(3)?.value).toBe(7)
})
