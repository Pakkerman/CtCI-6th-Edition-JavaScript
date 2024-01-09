import { BST, TreeNode } from '../util/BST'

export function isBalanced(tree: BST<number>): boolean {
  if (!tree.root) return true
  return checkHeight(tree.root) !== -Infinity

  function checkHeight(node: TreeNode<number> | undefined): number {
    if (!node) return -1

    const leftheight = checkHeight(node.left)
    if (leftheight === -Infinity) return -Infinity
    const rightheight = checkHeight(node.right)
    if (rightheight === -Infinity) return -Infinity

    if (Math.abs(leftheight - rightheight) > 1) return -Infinity

    return Math.max(leftheight, rightheight) + 1
  }
}
