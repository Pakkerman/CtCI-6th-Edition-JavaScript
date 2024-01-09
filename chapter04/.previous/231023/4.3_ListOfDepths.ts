// List of Depths: Given a binary tree, design an algorithm which creates a linked list of all the nodes in each depth (e.g., if you have a tree with depth D, you will have D linked lists).
// Hint: #107, #123, #135

import type { BinaryTreeNode } from '../../util/types'
import { SinglyLinkedList } from '../../util/SinglyLinkedList'

// from book solution
// input
//       6
//    4     5
//  1   3   2   7
// output
//       6
//    4  >  5
//  1 > 3 > 2 > 7

export function createWithBFS(
  root: BinaryTreeNode | undefined
): Array<SinglyLinkedList<BinaryTreeNode>> {
  const out: SinglyLinkedList<BinaryTreeNode>[] = []
  let curr = new SinglyLinkedList<BinaryTreeNode>()
  if (root) curr.append(root)

  while (curr.length) {
    out.push(curr)
    const parents = curr
    curr = new SinglyLinkedList<BinaryTreeNode>()
    for (let i = 0; i < parents.length; i++) {
      const parent = parents.get(i)
      if (parent?.left) curr.append(parent.left)
      if (parent?.right) curr.append(parent.right)
    }
  }
  return out
}

export function createWithDFS(
  root: BinaryTreeNode | undefined
): Array<SinglyLinkedList<BinaryTreeNode>> {
  const out: SinglyLinkedList<BinaryTreeNode>[] = []
  if (root) dfs(root)
  return out

  function dfs(curr: BinaryTreeNode | undefined, level: number = 0): void {
    if (!curr) return undefined
    if (!out[level]) out.push(new SinglyLinkedList<BinaryTreeNode>())

    out[level].append(curr)
    if (curr.left) dfs(curr.left, level + 1)
    if (curr.right) dfs(curr.right, level + 1)
  }
}

// const bfsbs = createWithDFS(BS)
// bfsbs.forEach((list) => list.printList())
