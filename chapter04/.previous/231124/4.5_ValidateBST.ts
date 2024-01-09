import { BST, TreeNode } from '../util/BST'

export function isValidBST(tree: BST<number>): boolean {
  if (!tree.root) return true // empty tree is "Valid"
  return recurse(tree.root)

  function recurse(
    node: TreeNode<number> | undefined,
    min: number = -Infinity,
    max: number = Infinity
  ): boolean {
    if (!node) return true
    if (node.value < min || max <= node.value) return false

    return (
      recurse(node.left, min, node.value) &&
      recurse(node.right, node.value, max)
    )
  }
}
