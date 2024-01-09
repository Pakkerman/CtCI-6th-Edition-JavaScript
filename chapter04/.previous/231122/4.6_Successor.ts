import { BST, TreeNode } from '../util/BST'

// brute force, traverse all nodes and put in an array, and get targetIdx + 1 item
export function findSuccessor(
  tree: BST<number>,
  target: number
): TreeNode<number> | undefined {
  if (!tree.root) return undefined
  const inOrderTraverse: TreeNode<number>[] = []
  traverse(tree.root)

  for (let i = 0; i < inOrderTraverse.length; i++) {
    if (inOrderTraverse[i].value === target) return inOrderTraverse[i + 1]
  }

  return undefined

  function traverse(node: TreeNode<number> | undefined): void {
    if (!node) return
    traverse(node.left)
    inOrderTraverse.push(node)
    traverse(node.right)
  }
}

// solution
export function inroderSucc(
  node: TreeNode<number> | undefined
): TreeNode<number> | undefined {
  if (!node) return undefined
  // found right children > return leftmost node of the right subtree
  if (node.right) {
    return leftMostChild(node.right)
  } else {
    let q = node
    let x = q.parent
    while (x && x.left != q) {
      q = x
      x = x.parent
    }
    return x
  }
}
function leftMostChild(node: TreeNode<number>): TreeNode<number> | undefined {
  if (!node) return undefined

  while (node.left) node = node.left
  return node
}
