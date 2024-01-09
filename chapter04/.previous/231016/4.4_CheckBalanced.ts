// 4.4 Check Balanced: Implement a function to check if a binary tree is balanced. For the purpose of this question, a balanced tree is defined to be a tree such that the heights of the two subtrees of any node never differ by more than one.
// Hints: #21, #33, #49, #105, #124

import type { BST, TreeNode } from '../util/BST'

// balanced
//        4
//    2       6
//  1   3   5   7
// 1 2 3 4 5 6 7 8
// not balanced
//        4
//    2       6
//  1   3   5   6
// 1 2 3 4 5   8

export function isBalanced<T>(tree: BST<T>): boolean {
  const root: TreeNode<T> | undefined = tree.root
  if (!root) return true
  return checkHeight(root) != -Infinity

  function checkHeight(curr: TreeNode<T> | undefined): number {
    if (!curr) return -1
    const leftHeight = checkHeight(curr.left)
    if (leftHeight === -Infinity) return -Infinity
    const rightHeight = checkHeight(curr.right)
    if (rightHeight === -Infinity) return -Infinity

    const diff = Math.abs(leftHeight - rightHeight)
    if (diff > 1) return -Infinity
    return Math.max(leftHeight, rightHeight) + 1
  }
}
