import { BST, TreeNode } from '../util/BST'
import { SinglyLinkedList } from '../util/SinglyLinkedList'

export function createWithDFS(
  tree: BST<number>
): SinglyLinkedList<TreeNode<number>>[] {
  if (!tree.root) return []
  const out: SinglyLinkedList<TreeNode<number>>[] = []
  recurse(tree.root)
  return out

  function recurse(
    curr: TreeNode<number> | undefined,
    height: number = 0
  ): void {
    if (!curr) return
    if (!out[height]) out.push(new SinglyLinkedList<TreeNode<number>>())
    out[height].append(curr)

    recurse(curr.left, height + 1)
    recurse(curr.right, height + 1)
  }
}
export function createWithBFS(
  tree: BST<number>
): SinglyLinkedList<TreeNode<number>>[] {
  const out: SinglyLinkedList<TreeNode<number>>[] = []
  let curr = new SinglyLinkedList<TreeNode<number>>()
  if (tree.root) curr.append(tree.root)

  while (curr.length) {
    out.push(curr)
    const parents = curr.getPrintList()
    curr = new SinglyLinkedList<TreeNode<number>>()
    for (let node of parents) {
      if (node.left) curr.append(node.left)
      if (node.right) curr.append(node.right)
    }
  }

  return out
}
