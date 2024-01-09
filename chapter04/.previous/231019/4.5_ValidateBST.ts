// 4.5 Validate BST: Implement a function to check if a binary tree is a binary search tree
// Hints: #35, #57, #86, #133, #128

// What is a BST?
// All values in the left subtree is smaller or equal to node's value
// All values in the right subtree is greater or equal to node's value
// A valid BST:
//        5
//      3   7
//     0 4 5 9
// Not Valid BST:
//        5
//      3   7
//     2 9 4 8
// in the perspective of 3, this chunk of the subtree is valid, but when you walk back to root, it is not, because 9 is greater than 5

import { TreeNode } from '../../util/BST'

// BinaryTreeA:
//        4
//    2       6
//  1   3   5   7

export function isValidBST(root: TreeNode<number> | undefined): boolean {
  if (!root) return true
  return dfs(root)

  function dfs(
    curr: TreeNode<number> | undefined,
    lo: number = -Infinity,
    hi: number = Infinity
  ): boolean {
    if (!curr) return true
    const mid = curr.value
    if (curr.value < lo || hi < curr.value) return false

    return dfs(curr.left, lo, mid) && dfs(curr.right, mid, hi)
  }
}
