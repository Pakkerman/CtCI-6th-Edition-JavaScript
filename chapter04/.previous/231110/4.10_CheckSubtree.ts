import { BinaryTree, TreeNode } from '../util/BinaryTree'

export function containsTree(
  T1: TreeNode<number> | undefined,
  T2: TreeNode<number> | undefined
): boolean {
  if (!T1 || !T2) return false
  const startingNodeInT1 = has(T1, T2)
  if (!startingNodeInT1) return false
  return compare(startingNodeInT1, T2)
}

function has(
  root: TreeNode<number> | undefined,
  node: TreeNode<number> | undefined
): TreeNode<number> | undefined {
  if (!root || !node) return undefined
  if (root === node) return root
  return has(root.left, node) || has(root.right, node)
}

function compare(
  a: TreeNode<number> | undefined,
  b: TreeNode<number> | undefined
): boolean {
  if (a === undefined && b === undefined) return true
  if (a === undefined || b === undefined) return false
  if (a.value !== b.value) return false
  return compare(a.left, b.left) && compare(a.right, b.right)
}

// Use pre-order traversal
export function containsTreeTraversal(
  T1: TreeNode<number> | undefined,
  T2: TreeNode<number> | undefined
): boolean {
  const stringT1: string[] = []
  const stringT2: string[] = []
  preOrderTraversal(T1, stringT1)
  preOrderTraversal(T2, stringT2)

  const s1 = stringT1.join('')
  const s2 = stringT2.join('')

  if (s1.includes(s2)) return true
  return false
}

function preOrderTraversal(
  node: TreeNode<number> | undefined,
  out: string[] = []
): void {
  if (!node) {
    out.push('X')
    return
  }

  if (node.value != null) out.push(node.value.toString())
  preOrderTraversal(node.left)
  preOrderTraversal(node.right)
}
