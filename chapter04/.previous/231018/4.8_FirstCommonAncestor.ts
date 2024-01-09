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
  let ancestor: TreeNode<T> | undefined = root
  while (ancestor) {
    if (isInSubtree(ancestor, a) && isInSubtree(ancestor, b)) {
      ancestor
    }
    return ancestor
  }

  function isInSubtree(
    root: TreeNode<T> | undefined,
    node: TreeNode<T>
  ): boolean {
    console.log(node, root)
    if (!root) return false
    if (root === node) return true
    return isInSubtree(root.left, node) || isInSubtree(root.right, node)
  }
}

const tree = new BinaryTree<number>()
tree.insert([1, 2, 3, 4, 5, 6, 7])

console.log(findCommonAncestor(tree.root!, tree.get(6)!, tree.get(7)!)?.value)
