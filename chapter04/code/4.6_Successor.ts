import { BST, TreeNode } from '../util/BST'

export function findSuccessor(
  tree: BST<number>,
  target: number
): TreeNode<number> | undefined {
  const out: TreeNode<number>[] = []
  traverse(tree.root)
  for (let i = 0; i < out.length; i++) {
    if (out[i].value === target) return out[i + 1]
  }

  function traverse(curr: TreeNode<number> | undefined): void {
    if (!curr) return

    traverse(curr.left)
    out.push(curr)
    traverse(curr.right)
  }
}

// solution
export function inroderSuccessor(
  node: TreeNode<number> | undefined
): TreeNode<number> | undefined {
  if (!node) return undefined
  if (node.right) return leftmostChild(node.right)

  let curr = node
  let parent = curr.parent
  while (parent && parent.left !== curr) {
    curr = parent
    parent = parent.parent
  }
  return parent

  function leftmostChild(
    curr: TreeNode<number> | undefined
  ): TreeNode<number> | undefined {
    if (!curr) return undefined

    while (curr.left) curr = curr.left
    return curr
  }
}
