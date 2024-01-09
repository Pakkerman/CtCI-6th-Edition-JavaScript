// 4.8 First Common Ancestor: Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a data structure. NOTE: This is not necessarily a binary search tree.
// Hints: #10, #16, #28, #36, #46, #70, #80, #96

export class TreeNode<T> {
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

export class BinaryTree<T> {
  public length: number
  public root?: TreeNode<T>
  private map: Map<T, TreeNode<T>>
  constructor(nodes?: Array<T>) {
    this.length = 0
    this.root = undefined
    this.map = new Map()
  }
  createUnlinkedNode(value: T): TreeNode<T> {
    // to create a new node inside of the BS, adding to map to keep track when getting
    const node = new TreeNode<T>(value)
    this.map.set(value, node)
    return node
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

export function findCommonAncestorWithParent<T>(
  root: TreeNode<T> | undefined,
  a: TreeNode<T> | undefined,
  b: TreeNode<T> | undefined
): TreeNode<T> | undefined {
  if (!root) return undefined
  const depthA = getDepth(root, a)
  const depthB = getDepth(root, b)
  if (depthA < depthB) [a, b] = [b, a]

  const delta = Math.abs(depthA - depthB)
  let jump = delta
  while (a && jump) {
    a = a.parent
    jump--
  }

  while (a && b) {
    a = a.parent
    b = b.parent
    if (a === b) return a
  }

  return undefined

  function getDepth(
    curr: TreeNode<T> | undefined,
    target: TreeNode<T> | undefined
  ): number {
    if (!curr) return -1
    if (curr === target) return 0
    const left = getDepth(curr.left, target)
    if (left !== -1) return left + 1
    const right = getDepth(curr.right, target)
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
  if (!has(root, a) || !has(root, b)) return undefined

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
