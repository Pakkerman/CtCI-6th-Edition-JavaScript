// 4.8 First Common Ancestor: Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a data structure. NOTE: This is not necessarily a binary search tree.
// Hints: #10, #16, #28, #36, #46, #70, #80, #96

import { TreeNode } from '../../util/BinaryTree'
import { blue, yellow, green } from '../../util/ConsoleColors'

export function findCommonAncestorWithParent<T>(
  a: TreeNode<T> | undefined,
  b: TreeNode<T> | undefined
): TreeNode<T> | undefined {}

// Without parents
export function findCommonAncestor<T>(
  root: TreeNode<T> | undefined,
  a: TreeNode<T> | undefined,
  b: TreeNode<T> | undefined
): TreeNode<T> | undefined {
  if (!root) return undefined
  if (root === a || root === b) return root

  const aLeft = has(root.left, a)
  const bLeft = has(root.left, b)
  if (aLeft !== bLeft) return root

  const next = aLeft ? root.left : root.right
  return findCommonAncestor(next, a, b)
}

class Result<T> {
  public node?: TreeNode<T>
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
    root: TreeNode<T> | undefined,
    a: TreeNode<T> | undefined,
    b: TreeNode<T> | undefined
  ): Result<T> {
    if (!root) return new Result(undefined, false)
    if (root === a && root === b) return new Result(root, true)

    const left = recurse(root.left, a, b)
    if (left.isAncestor) return left
    const right = recurse(root.right, a, b)
    if (right.isAncestor) return right

    if (left && right) return new Result(root, true)
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
