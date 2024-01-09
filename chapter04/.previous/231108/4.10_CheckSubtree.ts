import { BinaryTree, TreeNode } from '../../util/BinaryTree'

export function containsTree(
  T1: TreeNode<number> | undefined,
  T2: TreeNode<number> | undefined
): boolean {
  if (!T1 || !T2) return false
  const startingNodeInT1 = has(T1, T2)
  if (!startingNodeInT1) return false
  return compare(startingNodeInT1, T2)
}

function has(
  root: TreeNode<number> | undefined,
  node: TreeNode<number> | undefined
): TreeNode<number> | undefined {
  if (!root || !node) return undefined
  if (root === node) return root
  return has(root.left, node) || has(root.right, node)
}

function compare(
  a: TreeNode<number> | undefined,
  b: TreeNode<number> | undefined
): boolean {
  if (a === undefined && b === undefined) return true
  if (a === undefined || b === undefined) return false
  if (a.value !== b.value) return false
  return compare(a.left, b.left) && compare(a.right, b.right)
}
