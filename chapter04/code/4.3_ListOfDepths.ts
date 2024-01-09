import { BST, TreeNode } from '../util/BST'
import { SinglyLinkedList } from '../util/SinglyLinkedList'

export function createWithDFS(
  tree: BST<number>
): SinglyLinkedList<TreeNode<number>>[] {
  const out: SinglyLinkedList<TreeNode<number>>[] = []
  recurse(tree.root)
  return out

  function recurse(curr: TreeNode<number> | null, depth: number = 0): void {
    if (!curr) return
    if (!out[depth]) out.push(new SinglyLinkedList<TreeNode<number>>())

    out[depth].append(curr)
    recurse(curr.left, depth + 1)
    recurse(curr.right, depth + 1)
  }
}

export function createWithBFS(
  tree: BST<number>
): SinglyLinkedList<TreeNode<number>>[] {
  const root = tree.root
  if (!root) return []

  const out: SinglyLinkedList<TreeNode<number>>[] = []
  let queue = new SinglyLinkedList<TreeNode<number>>()
  queue.append(root)
  while (queue.length) {
    out.push(queue)
    const parents = queue.getPrintList()
    queue = new SinglyLinkedList<TreeNode<number>>()
    parents.forEach((item) => {
      if (item.left) queue.append(item.left)
      if (item.right) queue.append(item.right)
    })
  }
  return out
}
