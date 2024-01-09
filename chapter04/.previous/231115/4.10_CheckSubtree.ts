import { BinaryTree, TreeNode } from '../util/BinaryTree'

export function containsTree(
  T1: TreeNode<number> | undefined,
  T2: TreeNode<number> | undefined
): boolean {
  if (!T1 || !T2) return false

  const T2ValueThatFoundinT1: TreeNode<number>[] = []
  findNodes(T1, T2.value, T2ValueThatFoundinT1)

  for (const node of T2ValueThatFoundinT1) {
    if (compare(node, T2)) return true
  }

  return false
}

function findNodes(
  curr: TreeNode<number> | undefined,
  target: number,
  result: TreeNode<number>[]
): void {
  if (!curr) return
  if (curr.value === target) result.push(curr)

  findNodes(curr.left, target, result)
  findNodes(curr.right, target, result)
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
  if (!a || !b) return false
  const s1 = a.inOrderTraverse().join('')
  const s2 = b.inOrderTraverse().join('')

  return s1.includes(s2)
}
