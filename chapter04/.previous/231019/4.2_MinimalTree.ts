// 4.2 Minimal Tree: Given a sorted (increasing order) array with unique integer elements, write an algorithm to create a binary search tree with minimal height.
// Hints: #19, #73, #116

// A minimal binary tree has about the same number of nodes on the left of each node as on the right. Let's focus on just the root for now. How would you ensure that about same number of nodes are on the left of the root as the right?
// You could implement this by finding the 'ideal' next element to add and repeatedly calling insertValue. this will be a bit inefficient, as you would have to repeatedly traverse the tree. Try recursion instead. Can you divide this problem into subproblems?
// Imagine we had a createMinimalTree method that returns a minimal tree for a given array (but for some strange reason doesn't operate on the root of the tree). Could you use this to operate on the root of the tree? Could you write the base case for the function? Great! Then that's basically the entire function

//       1
//    2     3
//  4  5  6  7

import type { BinaryTreeNode } from '../../util/types'

export function CreateMinTree(
  arr: Array<number>,
  lo: number = 0,
  hi: number = arr.length - 1,
  indent: string = ''
): BinaryTreeNode | undefined {
  if (lo > hi) return undefined

  const mid = Math.floor(lo + (hi - lo) / 2)
  const node: BinaryTreeNode = { value: arr[mid] }
  node.left = CreateMinTree(arr, lo, mid - 1)
  node.right = CreateMinTree(arr, mid + 1, hi)

  return node
}
