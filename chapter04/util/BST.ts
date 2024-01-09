export class TreeNode<T> {
  public value: T
  public parent?: TreeNode<T>
  public left?: TreeNode<T>
  public right?: TreeNode<T>
  constructor(value: T, parent: TreeNode<T> | undefined = undefined) {
    this.value = value
    this.parent = parent
  }
}

export class BST<T> {
  public root?: TreeNode<T>
  constructor(arr?: Array<T>) {
    this.root = undefined
    if (arr) for (const value of arr) this.insertNode(value)
  }

  insertNode(value: T): void {
    if (!this.root) this.root = new TreeNode(value)
    else createNode(value, this.root)

    function createNode(value: T, curr: TreeNode<T>): void {
      if (value < curr.value) {
        if (!curr.left) curr.left = new TreeNode<T>(value, curr)
        else createNode(value, curr.left)
      } else if (curr.value <= value) {
        if (!curr.right) curr.right = new TreeNode<T>(value, curr)
        else createNode(value, curr.right)
      }
    }
  }

  inOrderOutput(): Array<T> {
    const out: T[] = []
    dfs(this.root)
    return out

    function dfs(curr: TreeNode<T> | undefined): void {
      if (!curr) return
      if (curr.left) dfs(curr.left)
      out.push(curr.value)
      if (curr.right) dfs(curr.right)
    }
  }
  preOrderOutput(): Array<T> {
    const out: T[] = []
    dfs(this.root)
    return out

    function dfs(curr: TreeNode<T> | undefined): void {
      if (!curr) return
      out.push(curr.value)
      if (curr.left) dfs(curr.left)
      if (curr.right) dfs(curr.right)
    }
  }
  postOrderOutput(): Array<T> {
    const out: T[] = []
    dfs(this.root)
    return out

    function dfs(curr: TreeNode<T> | undefined): void {
      if (!curr) return
      if (curr.left) dfs(curr.left)
      if (curr.right) dfs(curr.right)
      out.push(curr.value)
    }
  }

  get(value: T): TreeNode<T> | undefined {
    let curr = this.root
    return dfs(curr)

    function dfs(curr: TreeNode<T> | undefined): TreeNode<T> | undefined {
      if (!curr) return undefined
      if (curr.value === value) return curr
      return dfs(curr.left) || dfs(curr.right)
    }
  }
}
