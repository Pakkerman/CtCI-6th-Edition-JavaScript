import { BinaryTree, TreeNode } from '../util/BinaryTree'

// Randomize and get a number from 0 to length - 1 and just get() it
// Slow and working solution
export class BinaryTreeWithGetRandomNode<T> extends BinaryTree<T> {
  getRandomNode(): TreeNode<T> | undefined {
    const idx = Math.floor(Math.random() * (this.length - 1))
    const node = this.getPreOrderArray()

    return this.get(node[idx])
  }
}

// #6 solution
export class Node {
  private data: number
  public left: Node
  public right: Node
  private size: number
  constructor(data: number) {
    this.data = data
    this.size = 1
  }

  getRandomNode(): Node {
    const returnPoint = this.left ? this.left.getSize() : 0
    const seed = Math.floor(Math.random() * this.size)
    if (seed < returnPoint) return this.left.getRandomNode()
    else if (seed === returnPoint) return this
    else return this.right.getRandomNode()
  }

  find(data: number): Node | undefined {
    if (data === this.data) return this
    else if (data < this.data) return this.left.find(data)
    else this.right.find(data)
  }

  insertInOrder(data: number): void {
    if (data < this.data) {
      if (!this.left) this.left = new Node(data)
      else this.left.insertInOrder(data)
    } else {
      if (!this.right) this.right = new Node(data)
      else this.right.insertInOrder(data)
    }
    this.size++
  }

  getSize(): number {
    return this.size
  }
  getData(): number {
    return this.data
  }
}

export class RandomNodeTreeNode {
  private data: number
  public left: RandomNodeTreeNode
  public right: RandomNodeTreeNode
  private size: number
  constructor(data: number) {
    this.data = data
    this.size = 1
  }

  getIthNode(idx: number): RandomNodeTreeNode {
    const leftSize = this.left ? this.left.getSize() : 0
    if (idx < leftSize) {
      return this.left.getIthNode(idx)
    } else if (idx === leftSize) {
      return this
    } else {
      return this.right.getIthNode(idx - (leftSize + 1))
    }
  }

  insertInOrder(data: number): void {
    if (data < this.data) {
      if (!this.left) this.left = new RandomNodeTreeNode(data)
      else this.left.insertInOrder(data)
    } else {
      if (!this.right) this.right = new RandomNodeTreeNode(data)
      else this.right.insertInOrder(data)
    }
    this.size++
  }

  getSize(): number {
    return this.size
  }
  getData(): number {
    return this.data
  }

  find(data: number): RandomNodeTreeNode | undefined {
    if (data === this.data) {
      return this
    } else if (data <= this.data) {
      return this.left ? this.left.find(data) : undefined
    } else if (data > this.data) {
      return this.right ? this.right.find(data) : undefined
    }
  }
}

export class RandomNodeTree {
  public root?: RandomNodeTreeNode
  constructor() {
    this.root = undefined
  }
  getRandomNode(): RandomNodeTreeNode | undefined {
    if (!this.root) return undefined
    const random = Math.floor(Math.random() * this.size())
    return this.root.getIthNode(random)
  }

  public size(): number {
    return this.root ? this.root.getSize() : 0
  }
}
