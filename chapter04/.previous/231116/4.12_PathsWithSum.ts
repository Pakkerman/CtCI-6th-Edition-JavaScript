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

  total += countPaths(node.left, target, curr)
  total += countPaths(node.right, target, curr)

  return total
}

// Optimized
export function pathsWithSumOptimized(
  node: TreeNode<number> | undefined,
  target: number,
  curr: number = 0,
  pathCount: Map<number, number> = new Map()
): number {
  if (!node) return 0

  // count paths with sum ending at the current node
  curr += node.value
  const sum = curr - target
  let total = pathCount.get(sum) || 0

  // if runningsum equals targetSum, then one additional path starts at root, add this path
  if (curr === target) total++

  // increment pathCount, recurse, then decrement pathCount.
  incrememntHashTable(pathCount, curr, 1)
  total += pathsWithSumOptimized(node.left, target, curr, pathCount)
  total += pathsWithSumOptimized(node.right, target, curr, pathCount)
  incrememntHashTable(pathCount, curr, -1)

  return total
}

function incrememntHashTable(
  hashTable: Map<number, number>,
  key: number,
  delta: number
): void {
  const newCount = hashTable.get(key) || 0 + delta
  if (newCount === 0) {
    // remove when zero to reduce space usage
    hashTable.delete(key)
  } else {
    hashTable.set(key, newCount)
  }
}
