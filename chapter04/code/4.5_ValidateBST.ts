import { BST, TreeNode } from '../util/BST'

export function isValidBST(tree: BST<number>): boolean {
  return recurse(tree.root, -Infinity, Infinity)

  function recurse(curr: TreeNode<number>, min: number, max: number): boolean {
    if (!curr) return true

    const val = curr.value
    if (val < min || max <= val) return false

    return recurse(curr.left, min, val) && recurse(curr.right, val, max)
  }
}
