import { BinaryTree, TreeNode } from '../../util/BinaryTree'

export function containsTree(
  a: TreeNode<number> | undefined,
  b: TreeNode<number> | undefined
): boolean {
  if (!a || !b) return false

  const targetNodesInA: TreeNode<number>[] = []
  findNodes(a, b.value, targetNodesInA)

  for (const node of targetNodesInA) {
    if (compare(node, b)) return true
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
  const s1 = a.inOrderTraverse()
  const s2 = b.inOrderTraverse()

  return s1.join('').includes(s2.join(''))
}
