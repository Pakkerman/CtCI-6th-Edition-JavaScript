// 4.8 First Common Ancestor: Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a data structure. NOTE: This is not necessarily a binary search tree.
// Hints: #10, #16, #28, #36, #46, #70, #80, #96

import { BinaryTree, TreeNode } from '../util/BinaryTree'
import { blue, yellow, green } from '../util/ConsoleColors'

export function findCommonAncestorWithParent<T>(
  root: TreeNode<T> | undefined,
  a: TreeNode<T> | undefined,
  b: TreeNode<T> | undefined
): TreeNode<T> | undefined {
  if (!root || !a || !b) return undefined
  if (root === a || root === b) return root

  const depthA = getDepth(root, a)
  const depthB = getDepth(root, b)
  if (depthA === -1 || depthB === -1) return undefined

  const delta = depthA - depthB
  if (delta < 0) [a, b] = [b, a]

  let traverseBack = Math.abs(delta)
  while (a && traverseBack) {
    a = a.parent
    traverseBack--
  }

  if (!a) return undefined

  while (a && b) {
    a = a.parent
    b = b.parent
    if (a === b) return a
  }

  return undefined

  function getDepth(
    root: TreeNode<T> | undefined,
    node: TreeNode<T> | undefined
  ): number {
    let depth = 0
    while (node) {
      node = node.parent
      depth++
      if (node === root) return depth
    }
    return -1
  }
}

// Without parents
export function findCommonAncestor<T>(
  root: TreeNode<T> | undefined,
  a: TreeNode<T> | undefined,
  b: TreeNode<T> | undefined
): TreeNode<T> | undefined {
  if (!root || !a || !b) return undefined
  if (!has(root, a) || !has(root, b)) return undefined

  const aOnLeft = has(root.left, a)
  const bOnLeft = has(root.left, b)
  if (aOnLeft !== bOnLeft) return root

  const next = aOnLeft ? root.left : root.right
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
  if (result.isAncestor) return result.node
  else return undefined

  function recurse(
    root: TreeNode<T> | undefined,
    a: TreeNode<T> | undefined,
    b: TreeNode<T> | undefined,
    indent: string = ''
  ): Result<T> {
    console.log(indent, blue, `# RECURSE CALL`)
    indent += '  '
    console.log(indent, yellow, `BASECASE`)
    if (!root) return new Result(undefined, false)
    if (root === a && root === b) return new Result(root, true)

    console.log(indent, yellow, `RECURSE LEFT`)
    const left = recurse(root.left, a, b, indent)
    console.log(
      indent,
      green,
      `left = result(${left.node?.value}, ${left.isAncestor})`
    )
    if (left.isAncestor) return left

    console.log(indent, yellow, `RECURSE RIGHT`)
    const right = recurse(root.right, a, b, indent)
    console.log(
      indent,
      green,
      `right = result(${right.node?.value}, ${right.isAncestor})`
    )
    if (right.isAncestor) return right

    console.log(indent, yellow, `POST THINGS`)
    console.log(
      indent,
      yellow,
      `root: ${root.value}, a: ${a?.value}, b: ${b?.value}`
    )
    console.log(
      indent,
      yellow,
      `left: result(${left.node?.value}, ${left.isAncestor})`
    )
    console.log(
      indent,
      yellow,
      `right: result(${right.node?.value}, ${right.isAncestor})`
    )
    if (left.node && right.node) return new Result(root, true)
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

const tree = new BinaryTree<number>()
tree.insert([1])
tree.root!.left = tree.createUnlinkedNode(3)
tree.root!.left.parent = tree.root
tree.root!.left.left = tree.createUnlinkedNode(2)
tree.root!.left.left.parent = tree.root!.left
tree.root!.left.right = tree.createUnlinkedNode(4)
tree.root!.left.right.parent = tree.root!.left
// right half
tree.root!.right = tree.createUnlinkedNode(5)
tree.root!.right.parent = tree.root
tree.root!.right.left = tree.createUnlinkedNode(7)
tree.root!.right.left.parent = tree.root!.right
tree.root!.right.right = tree.createUnlinkedNode(9)
tree.root!.right.right.parent = tree.root!.right
tree.root!.right.left.left = tree.createUnlinkedNode(8)
tree.root!.right.left.left.parent = tree.root!.right.left

console.log(
  findCommonAncestorOptimised(tree.root, tree.get(3), tree.get(5))?.value
)
