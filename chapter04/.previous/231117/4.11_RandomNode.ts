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
  private size: number
  public left: Node
  public right: Node
  constructor(data: number) {
    this.data = data
    this.size = 1
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
  getRandomNode(): Node | undefined {
    const returnPoint = this.left ? this.left.getSize() : 0
    const seed = Math.floor(Math.random() * this.size)
    if (seed === returnPoint) return this
    if (seed < returnPoint) return this.left.getRandomNode()
    else if (returnPoint < seed) return this.right.getRandomNode()
  }

  find(data: number): Node | undefined {
    if (data < this.data) return this.left.find(data)
    else if (this.data < data) return this.right.find(data)
    return this
  }

  getData(): number {
    return this.data
  }
  getSize(): number {
    return this.size
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

  // Instead of regenerate seed every iteration, we just use that idx ( which is generated random in the range of 0 to treesize.length - 1),
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
  // The 0 index node is not 5, is 2, the left most node
  //          5
  //       3    7
  //     2  4  6 8
  // idx = 3
  // left = 3
  // return 5???

  // idx = 0
  // left = 3
  // return left.getnode(o)
  // idx = 0
  // left = 1
  // return left.getNode(0)
  // left = 0
  // idx === left >> return 2?

  // idx = 6
  // left is 3
  // idx > leftsize
  // return right.getnode(idx - (leftsize+1))
  // idx = 6 - 4 = 2
  // leftsize = 1
  // idx > left size => return random getnode(idx - leftsize+1)
  // idx = 2 - 2 = 0
  // idx = 0 > leftsize = 0
  // idx === left size  reutrn root

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
    // use random to decide a idx, that is within the size of the whole tree.
    const random = Math.floor(Math.random() * this.size())
    return this.root.getIthNode(random) // get that idx
  }

  public size(): number {
    return this.root ? this.root.getSize() : 0
  }
}
