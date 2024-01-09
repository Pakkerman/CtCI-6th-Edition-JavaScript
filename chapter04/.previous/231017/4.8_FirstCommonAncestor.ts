// 4.8 First Common Ancestor: Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a data structure. NOTE: This is not necessarily a binary search tree.
// Hints: #10, #16, #28, #36, #46, #70, #80, #96

function findAncestor<T>(
  tree: BinaryTree<T>,
  a: T,
  b: T
): TreeNode<T> | undefined {
  if (tree.has(a) && !tree.has(b)) return tree.get(a)
  if (tree.has(b) && !tree.has(a)) return tree.get(b)
  if (a === b) return this.node.get(a)
}

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
  insert(nodes: Array<T>): void {
    let curr = this.root
    for (const value of nodes) {
      this.length++
      if (!this.root) {
        this.root = new TreeNode<T>(value)
        this.map.set(value, this.root)
        continue
      }
      const node = new TreeNode<T>(value)
      this.map.set(value, node)
    }
  }

  has(value: T): boolean {
    return this.map.has(value)
  }

  get(value: T): TreeNode<T> | undefined {
    return this.map.get(value)
  }
}
