import { TreeNode } from '../../util/BinaryTree'

// get all paths
export function pathsWithSum(
  node: TreeNode<number> | undefined,
  target: number
): number {
  if (!node) return 0

  let total = 0
  total += countPaths(node, target)
  total += pathsWithSum(node.left, target)
  total += pathsWithSum(node.right, target)
  return total
}

function countPaths(
  node: TreeNode<number> | undefined,
  target: number,
  curr: number = 0
): number {
  if (!node) return 0

  let total = 0
  curr += node.value
  if (curr === target) total++

  return (
    total +
    countPaths(node.left, target, curr) +
    countPaths(node.right, target, curr)
  )
}

// Optimized
export function pathsWithSumOptimized(
  node: TreeNode<number> | undefined,
  target: number
): number {
  return countPaths(node, target, 0, new Map<number, number>())

  function countPaths(
    node: TreeNode<number> | undefined,
    target: number,
    running: number,
    pathCount: Map<number, number>
  ): number {
    if (!node) return 0

    running += node.value
    const currSum = running - target
    let total = pathCount.get(currSum) || 0
    if (running === target) total++

    incrememntHashTable(pathCount, running, 1)
    total += countPaths(node.left, target, running, pathCount)
    total += countPaths(node.right, target, running, pathCount)
    incrememntHashTable(pathCount, running, -1)

    return total
  }
}

function incrememntHashTable(
  hashTable: Map<number, number>,
  key: number,
  delta: number
): void {
  const newCount = (hashTable.get(key) || 0) + delta
  if (newCount === 0) hashTable.delete(key)
  else hashTable.set(key, newCount)
}
