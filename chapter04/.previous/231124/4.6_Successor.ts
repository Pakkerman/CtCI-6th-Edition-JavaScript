import { BST, TreeNode } from '../util/BST'

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

  if (node.right) return leftMostChild(node.right)
  else {
    let curr = node
    let parent = node.parent
    while (parent && parent.left != curr) {
      curr = parent
      parent = parent.parent
    }
    return parent
  }
}
function leftMostChild(node: TreeNode<number>): TreeNode<number> | undefined {
  if (!node) return undefined

  while (node.left) node = node.left
  return node
}
