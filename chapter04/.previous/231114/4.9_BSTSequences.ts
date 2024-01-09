import { BST, TreeNode } from '../util/BST'
import { SinglyLinkedList } from '../util/SinglyLinkedList'
import { blue, yellow, green } from '../util/ConsoleColors'

//        50
//     20    60
//  10   25    70
// 5 15      65  80
// const tree = new BST([50, 20, 60, 10, 25, 70, 5, 15, 65, 80])
// const tree = new BST([5, 2, 7, 1, 3, 6, 9])

export function allSequences(
  node: TreeNode<number> | undefined
): SinglyLinkedList<number>[] {
  const out: SinglyLinkedList<number>[] = []
  if (!node) {
    out.push(new SinglyLinkedList<number>())
    return out
  }

  const prefix = new SinglyLinkedList<number>()
  prefix.append(node.value)

  const leftSeq = allSequences(node.left)
  const rightSeq = allSequences(node.right)

  for (const left of leftSeq) {
    for (const right of rightSeq) {
      const weaved: SinglyLinkedList<number>[] = []
      weaveLists(left, right, prefix, weaved)
      out.push(...weaved)
    }
  }

  return out
}
function weaveLists(
  left: SinglyLinkedList<number>,
  right: SinglyLinkedList<number>,
  prefix: SinglyLinkedList<number>,
  weaved: SinglyLinkedList<number>[]
): void {
  if (left.length === 0 || right.length === 0) {
    const out = prefix.cloneList()
    let i = 0
    while (i < left.length) out.append(left.get(i++)!)
    i = 0
    while (i < right.length) out.append(right.get(i++)!)
    weaved.push(out)
    return
  }

  const lefthead = left.removeAtHead()!
  prefix.append(lefthead)
  weaveLists(left, right, prefix, weaved)
  prefix.removeAtTail()
  left.prepend(lefthead)

  const righthead = right.removeAtHead()!
  prefix.append(righthead)
  weaveLists(left, right, prefix, weaved)
  prefix.removeAtTail()
  right.prepend(righthead)
}
