// 4.8 First Common Ancestor: Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a data structure. NOTE: This is not necessarily a binary search tree.
// Hints: #10, #16, #28, #36, #46, #70, #80, #96

import { BinaryTree, TreeNode } from '../util/BinaryTree'
import { blue, yellow, green } from '../util/ConsoleColors'

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

  let stepUp = Math.abs(delta)
  while (a && stepUp--) a = a.parent

  if (!a) return undefined

  while (a && b) {
    a = a.parent
    b = b.parent
    if (a === b) return a
  }

  return undefined

  function getDepth(root: TreeNode<T>, node: TreeNode<T> | undefined): number {
    let depth = 0
    while (node && node !== root) {
      node = node.parent
      depth++
    }

    return depth
  }
}

// Without parents
export function findCommonAncestor<T>(
  root: TreeNode<T> | undefined,
  a: TreeNode<T> | undefined,
  b: TreeNode<T> | undefined
): TreeNode<T> | undefined {
  if (!root) return undefined
  if (!has(root, a) || !has(root, b)) return undefined

  const leftHasA = has(root.left, a)
  const leftHasB = has(root.left, b)

  if (leftHasA !== leftHasB) return root

  const next = leftHasA ? root.left : root.right
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
    if (a === root && b === root) return new Result(root, true)

    const left = recurse(root.left, a, b)
    if (left.isAncestor) return left
    const right = recurse(root.right, a, b)
    if (right.isAncestor) return right

    if (left && right) return new Result(root, true)
    else if (a === root || b === root)
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
