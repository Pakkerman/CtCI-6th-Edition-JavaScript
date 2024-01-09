import { BinaryTree, TreeNode } from '../../util/BinaryTree'

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
    const leftSize = this.left == null ? 0 : this.left.getSize()
    const randomIdx = Math.floor(Math.random() * this.size)
    if (randomIdx < leftSize) {
      return this.left.getRandomNode()
    } else if (randomIdx === leftSize) {
      return this
    } else {
      return this.right.getRandomNode()
    }
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

  find(data: number): Node | undefined {
    if (data === this.data) {
      return this
    } else if (data <= this.data) {
      return this.left ? this.left.find(data) : undefined
    } else if (data > this.data) {
      return this.right ? this.right.find(data) : undefined
    }
  }
}
