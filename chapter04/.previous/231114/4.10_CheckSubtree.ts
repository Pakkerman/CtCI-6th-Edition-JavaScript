import { BinaryTree, TreeNode } from '../../util/BinaryTree'

export function containsTree(
  T1: TreeNode<number> | undefined,
  T2: TreeNode<number> | undefined
): boolean {
  const T2rootInT1 = has(T1, T2)
  console.log(T2rootInT1)
  return compare(T1, T2rootInT1)
}

function has(
  root: TreeNode<number> | undefined,
  node: TreeNode<number> | undefined
): TreeNode<number> | undefined {
  if (!root) return undefined
  if (root.value === node.value) return node
  return has(root.left, node) || has(root.right, node)
}

function compare(
  a: TreeNode<number> | undefined,
  b: TreeNode<number> | undefined
): boolean {
  if (!a && !b) return true
  if (!a || !b) return false
  if (a.value !== b.value) return false
  return compare(a.left, b.left) && compare(a.right, b.right)
}

// Use pre-order traversal
export function containsTreeTraversal(
  a: TreeNode<number> | undefined,
  b: TreeNode<number> | undefined
): boolean {
  const outA: string[] = []
  const outB: string[] = []
  preOrderTraversal(a, outA)
  preOrderTraversal(b, outB)

  return outA.join('').includes(outB.join(''))
}

function preOrderTraversal(
  node: TreeNode<number> | undefined,
  out: string[] = []
): void {
  if (!node) return
  out.push(node.value)
  preOrderTraversal(node.left, out)
  preOrderTraversal(node.right, out)
}
