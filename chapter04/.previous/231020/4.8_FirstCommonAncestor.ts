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
type Param<T> = TreeNode<T> | undefined
export function findCommonAncestor<T>(
  root: Param<T>,
  a: Param<T>,
  b: Param<T>
): Param<T> {
  if (!root) return undefined
  if (!has(root, a)) return undefined
  if (!has(root, a)) return undefined
  return recurse(root, a, b)

  function recurse(curr: Param<T>, a: Param<T>, b: Param<T>): Param<T> {
    if (!curr) return undefined
    if (curr === a || curr === b) return curr

    const aOnLeft = has(curr.left, a)
    const bOnLeft = has(curr.left, b)

    if (aOnLeft !== bOnLeft) return curr

    if (aOnLeft && bOnLeft) return recurse(curr.left, a, b)
    else return recurse(curr.right, a, b)
  }
  function has(curr: Param<T>, node: Param<T>): boolean {
    if (!curr) return false
    if (curr === node) return true
    return has(curr.left, node) || has(curr.right, node)
  }
}

// #4
// class Result<T> {
//   public node: TreeNode<T> | undefined
//   public isAncestor: boolean
//   constructor(node: TreeNode<T> | undefined, isAncestor: boolean) {
//     this.node = node
//     this.isAncestor = isAncestor
//   }
// }

// function findCommonAncestorOptimised<T>(
//   root: TreeNode<T>,
//   a: TreeNode<T>,
//   b: TreeNode<T>
// ): TreeNode<T> | undefined {
//   const result: Result<T> = recurse(root, a, b)
//   if (result.isAncestor) return result?.node
//   return undefined

//   function recurse<T>(
//     root: TreeNode<T> | undefined,
//     a: TreeNode<T>,
//     b: TreeNode<T>
//   ): Result<T> {
//     if (!root) return new Result<T>(undefined, false)
//     if (root === a && root === b) return new Result(root, true)

//     const x: Result<T> = recurse(root.left, a, b)
//     if (x.isAncestor) return x
//     const y: Result<T> = recurse(root.right, a, b)
//     if (y.isAncestor) return y

//     if (x.node && y.node) {
//       return new Result(root, true)
//     } else if (root === a || root === b) {
//       const isAncestor = !!(x.node || y.node)
//       return new Result(root, isAncestor)
//     } else {
//       if (x.node) return new Result(x.node, false)
//       else return new Result(y.node, false)
//     }
//   }
// }

// const tree = new BinaryTree<number>()
// tree.insert([1, 2, 3, 4, 5, 6, 7])

// console.log(findCommonAncestorOptimised(tree.root!, tree.get(5)!, tree.get(6)!))

// // trace
// // find(3, 1, 5)
// // if fail
// // if fail
// // x = {node:1, false}
// // >> find(1, 1, 5)
// // >> if fail
// // >> if fail
// // >> x = {node: undefined, false}
// // >>>> find(null, 1, 5)
// // >>>> if return result(undefined, false)
// // >> if fail
// // >> y = {node:undefined, false}
// // >>>> find(null, 1, 5)
// // >>>> if return result(undefined, false)
// // >> if fail
// // >> if fail
// // >> else root == a  return result(1, false)
// // if fail
// // y = {node: 5, false}
// // >> find(5, 1, 5)
// // >> if fail
// // >> if fail
// // >> x = {node:undefined, false}
// // >> if fail
// // >> y = {node: undefined, false}
// // >> if fail
// // >> if fail
// // >> else root = b return result(5, false)
// // return result(3, true)
