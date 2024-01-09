// 4.8 First Common Ancestor: Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a data structure. NOTE: This is not necessarily a binary search tree.
// Hints: #10, #16, #28, #36, #46, #70, #80, #96

import { TreeNode } from '../util/BinaryTree'

export function findCommonAncestorWithParent<T>(
  root: TreeNode<T> | undefined,
  a: TreeNode<T> | undefined,
  b: TreeNode<T> | undefined
): TreeNode<T> | undefined {
  if (!root) return undefined
  if (a === root || b === root) return root
  const depthA = getDepth(root, a)
  const depthB = getDepth(root, b)
  const delta = depthA - depthB
  if (delta < 0) [a, b] = [b, a]

  let parentTraverseCount = Math.abs(delta)
  while (a && parentTraverseCount) {
    a = a.parent
    parentTraverseCount--
  }

  while (a && b) {
    a = a.parent
    b = b.parent
    if (a === b) return a
  }

  return undefined

  function getDepth(
    curr: TreeNode<T> | undefined,
    node: TreeNode<T> | undefined
  ): number {
    if (!curr) return -1
    if (curr === node) return 0

    const left = getDepth(curr.left, node)
    if (left !== -1) return left + 1
    const right = getDepth(curr.right, node)
    if (right !== -1) return right + 1
    return -1
  }
}

// Without parents
export function findCommonAncestor<T>(
  root: TreeNode<T> | undefined,
  a: TreeNode<T> | undefined,
  b: TreeNode<T> | undefined
): TreeNode<T> | undefined {
  if (!root) return undefined
  if (root === a || root === b) return root

  const leftHasA = has(root.left, a)
  const leftHasB = has(root.left, b)
  if (leftHasA !== leftHasB) return root
  const next = leftHasA ? root.left : root.right
  return findCommonAncestor(next, a, b)
}

class Result<T> {
  public node: TreeNode<T> | undefined
  public isAncestor: boolean
  constructor(node: TreeNode<T> | undefined, isAncestor: boolean) {
    this.node = node
    this.isAncestor = isAncestor
  }
}

export function findCommonAncestorOptimised<T>(
  root: TreeNode<T> | undefined,
  a: TreeNode<T> | undefined,
  b: TreeNode<T> | undefined
): TreeNode<T> | undefined {
  const result = recurse(root, a, b)
  return result.isAncestor ? result.node : undefined

  function recurse(
    curr: TreeNode<T> | undefined,
    a: TreeNode<T> | undefined,
    b: TreeNode<T> | undefined
  ): Result<T> {
    if (!curr) return new Result(undefined, false)
    if (curr === a && curr === b) return new Result(curr, true)

    const left = recurse(curr.left, a, b)
    if (left.isAncestor) return left
    const right = recurse(curr.right, a, b)
    if (right.isAncestor) return right

    if (left && right) return new Result(curr, true)
    else if (root === a || root === b)
      return new Result(root, !!left.node || !!right.node)
    else return new Result(left.node ? left.node : right.node, false)
  }
}

// helper
function has<T>(
  curr: TreeNode<T> | undefined,
  node: TreeNode<T> | undefined
): boolean {
  if (!curr) return false
  if (curr === node) return true
  return has(curr.left, node) || has(curr.right, node)
}
