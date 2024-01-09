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
      weaveLists(left, right, weaved, prefix)
      out.push(...weaved)
    }
  }
  return out
}

function weaveLists(
  left: SinglyLinkedList<number>,
  right: SinglyLinkedList<number>,
  weaved: SinglyLinkedList<number>[],
  prefix: SinglyLinkedList<number>
) {
  if (!left.length || !right.length) {
    const result = prefix.cloneList()
    let i = 0
    while (left.get(i)) result.append(left.get(i++)!)
    i = 0
    while (right.get(i)) result.append(right.get(i++)!)
    weaved.push(result)
    return
  }

  const leftHead = left.removeAtHead()!
  prefix.append(leftHead)
  weaveLists(left, right, weaved, prefix)
  prefix.removeAtTail()
  left.prepend(leftHead)

  const rightHead = right.removeAtHead()!
  prefix.append(rightHead)
  weaveLists(left, right, weaved, prefix)
  prefix.removeAtTail()
  right.prepend(rightHead)
}
