import { BinaryTree, TreeNode } from '../../util/BinaryTree'

// get all paths

export function pathsWithSum(
  node: TreeNode<number> | undefined,
  target: number
): number {
  if (!node) return 0

  let total = 0

  total += countPaths(node, target)
  total += countPaths(node.left, target)
  total += countPaths(node.right, target)

  return total
}

function countPaths(
  node: TreeNode<number> | undefined,
  target: number,
  curr: number = 0
): number {
  if (!node) return 0

  let total = 0
  curr += node.value!
  if (curr === target) total++

  total += countPaths(node.left, target, curr)
  total += countPaths(node.right, target, curr)
  return total
}
