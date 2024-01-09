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
  let queue = new SinglyLinkedList<TreeNode<number>>()
  if (tree.root) queue.append(tree.root)

  while (queue.length) {
    out.push(queue)
    const parents = queue.getPrintList()
    queue = new SinglyLinkedList<TreeNode<number>>()
    for (let node of parents) {
      if (node.left) queue.append(node.left)
      if (node.right) queue.append(node.right)
    }
  }

  return out
}
