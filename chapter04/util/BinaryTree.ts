export class TreeNode<T> {
  public value: T
  public left?: TreeNode<T>
  public right?: TreeNode<T>
  public parent?: TreeNode<T>

  constructor(value: T) {
    this.value = value
  }

  insertInOrder(value: T, parent: TreeNode<T> | undefined = undefined): void {
    // for connecting parent when insert left or right node
    parent = this
    if (value < this.value) {
      if (!this.left) {
        this.left = new TreeNode<T>(value)
        this.left.parent = parent
      } else {
        this.left.insertInOrder(value, parent)
      }
    } else {
      if (!this.right) {
        this.right = new TreeNode<T>(value)
        this.right.parent = parent
      } else {
        this.right.insertInOrder(value, parent)
      }
    }
  }

  inOrderTraverse(): T[] {
    const out: T[] = []
    recurse(this)
    return out

    function recurse(curr: TreeNode<T> | undefined): void {
      if (!curr) return

      recurse(curr.left)
      out.push(curr.value)
      recurse(curr.right)
    }
  }
}

export class BinaryTree<T> {
  public length: number
  public root: TreeNode<T>
  private map: Map<T, TreeNode<T>>
  constructor(nodes?: Array<T>) {
    this.length = 0
    this.root = new TreeNode<T>(nodes?.[0] || (5 as T))
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
      this.map.set(values[0], this.root)
      values.shift()
      if (values.length === 0) return
    }

    for (const value of values) {
      const node = new TreeNode<T>(value)
      this.length++
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

  getPreOrderArray(): T[] {
    const out: T[] = []
    recurse(this.root)
    return out

    function recurse(curr: TreeNode<T> | undefined): void {
      if (!curr) return

      if (curr.value) out.push(curr.value)
      recurse(curr.left)
      recurse(curr.right)
    }
  }
}
