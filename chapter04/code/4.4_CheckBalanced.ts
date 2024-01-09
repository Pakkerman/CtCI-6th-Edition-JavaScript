import { BST, TreeNode } from '../util/BST'

export function isBalanced(tree: BST<number>): boolean {
  const root = tree.root
  if (!tree) return true

  return recurse(root) !== -Infinity

  function recurse(curr: TreeNode<number> | undefined): number {
    if (!curr) return -1

    const left = recurse(curr.left)
    if (left === -Infinity) return -Infinity

    const right = recurse(curr.right)
    if (right === -Infinity) return -Infinity

    const diff = Math.abs(left - right)
    if (1 < diff) return -Infinity

    return Math.max(left, right) + 1
  }
}
