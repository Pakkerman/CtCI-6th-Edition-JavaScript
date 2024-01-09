// 4.8 First Common Ancestor: Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a data structure. NOTE: This is not necessarily a binary search tree.
// Hints: #10, #16, #28, #36, #46, #70, #80, #96

class TreeNode<T> {
  public value: T | null
  public left?: TreeNode<T>
  public right?: TreeNode<T>
  public parent?: TreeNode<T>

  constructor(
    value: T | null,
    left?: TreeNode<T>,
    right?: TreeNode<T>,
    parent?: TreeNode<T>
  ) {
    this.value = value
    this.left = left
    this.right = right
    this.parent = parent
  }
}

class BinaryTree<T> {
  public length: number
  public root?: TreeNode<T>
  private map: Map<T, TreeNode<T>>
  constructor(nodes?: Array<T>) {
    this.length = 0
    this.root = undefined
    this.map = new Map()
  }
  insert(values: Array<T>): void {
    if (!this.root) {
      this.root = new TreeNode<T>(values[0])
      values.shift()
      if (values.length === 0) return
    }

    for (const value of values) {
      const node = new TreeNode<T>(value)
      this.map.set(value, node)
      this.insertRecurse(node)
    }
  }

  // inserting nodes randomly,
  private insertRecurse(node: TreeNode<T>): void {
    if (!this.root) return
    let curr = this.root
    // curr will traverse at random, until there is either left opening or right opening
    while (curr.left && curr.right) {
      curr = Math.random() > 0.5 ? curr.left : curr.right
    }
    // If curr has no left or right, just give it to left
    if (!curr.left && !curr.right) {
      curr.left = node
      return
    }

    // if left is filled, put in right vice versa
    if (curr.left) curr.right = node
    else if (curr.right) curr.left = node
  }

  has(value: T): boolean {
    return this.map.has(value)
  }

  get(value: T): TreeNode<T> | undefined {
    return this.map.get(value)
  }
}

// With parent
// Runtime: O(depth), need to at least walk the deeper node by depth
function commonAncestorWithParentPtr<T>(
  a: TreeNode<T>,
  b: TreeNode<T>
): TreeNode<T> | null {
  const delta = depth(a) - depth(b)
  let shallow: TreeNode<T> | undefined = delta > 0 ? b : a
  let deep: TreeNode<T> | undefined = delta > 0 ? a : b
  goUp(deep, Math.abs(delta))

  while (shallow && deep) {
    if (shallow === deep) return shallow
    shallow = shallow.parent
    deep = deep.parent
  }
  return null

  // helpers
  function goUp(node: TreeNode<T>, by: number): void {
    let curr: TreeNode<T> | undefined = node
    while (curr && by > 0) {
      curr = curr.parent
      by--
    }
  }

  function depth(node: TreeNode<T>): number {
    let depth = 0
    let curr: TreeNode<T> | undefined = node
    while (curr) {
      curr = curr.parent
      depth++
    }

    return depth
  }
}

// Without parent
function findCommonAncestor<T>(
  root: TreeNode<T>,
  a: TreeNode<T>,
  b: TreeNode<T>
): TreeNode<T> | undefined {
  if (!hasChild(root, a) || !hasChild(root, b)) return undefined
  return getAncestor(root, a, b)

  // helper
  function getAncestor(
    root: TreeNode<T> | undefined,
    a: TreeNode<T>,
    b: TreeNode<T>
  ): TreeNode<T> | undefined {
    if (!root || root === a || root === b) return root

    const hasAOnLeft = hasChild(root.left, a)
    const hasBOnLeft = hasChild(root.left, b)
    if (hasAOnLeft !== hasBOnLeft) return root

    const next = hasAOnLeft ? root.left : root.right
    return getAncestor(next, a, b)
  }

  function hasChild(
    curr: TreeNode<T> | undefined,
    child: TreeNode<T>
  ): boolean {
    if (!curr) return false
    if (curr === child) return true
    return hasChild(curr.left, child) || hasChild(curr.right, child)
  }
}

// #4
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
  const result: Result<T> = recurse(root, a, b)
  if (result.isAncestor) return result.node
  return undefined

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

    if (left.node && right.node) return new Result(root, true)
    else if (root === a || root === b)
      return new Result(root, !!left.node || !!right.node)
    else return new Result(left.node ? left.node : right.node, false)
  }
}
// trace
// find(3, 1, 5)
// if fail
// if fail
// x = {node:1, false}
// >> find(1, 1, 5)
// >> if fail
// >> if fail
// >> x = {node: undefined, false}
// >>>> find(null, 1, 5)
// >>>> if return result(undefined, false)
// >> if fail
// >> y = {node:undefined, false}
// >>>> find(null, 1, 5)
// >>>> if return result(undefined, false)
// >> if fail
// >> if fail
// >> else root == a  return result(1, false)
// if fail
// y = {node: 5, false}
// >> find(5, 1, 5)
// >> if fail
// >> if fail
// >> x = {node:undefined, false}
// >> if fail
// >> y = {node: undefined, false}
// >> if fail
// >> if fail
// >> else root = b return result(5, false)
// return result(3, true)
