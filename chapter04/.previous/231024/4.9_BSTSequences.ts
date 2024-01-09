import { BST, TreeNode } from '../util/BST'
import { SinglyLinkedList } from '../util/SinglyLinkedList'

//        50
//     20    60
//  10   25    70
// 5 15      65  80
// const tree = new BST([50, 20, 60, 10, 25, 70, 5, 15, 65, 80])
const tree = new BST([2, 1, 3])
const out = allSequences(tree.root)
console.log(out.map((item) => item.printList()))

function allSequences(
  node: TreeNode<number> | undefined
): Array<SinglyLinkedList<number>> {
  const result: SinglyLinkedList<number>[] = []

  if (!node) {
    result.push(new SinglyLinkedList<number>())
    return result
  }

  const prefix = new SinglyLinkedList<number>()
  prefix.append(node.value)

  const leftSeq = allSequences(node.left)
  const rightSeq = allSequences(node.right)

  for (const left of leftSeq) {
    for (const right of rightSeq) {
      const weaved: SinglyLinkedList<number>[] = []
      weaveLists(left, right, weaved, prefix)
      result.push(...weaved)
    }
  }

  return result
}

function weaveLists(
  left: SinglyLinkedList<number>,
  right: SinglyLinkedList<number>,
  results: SinglyLinkedList<number>[],
  prefix: SinglyLinkedList<number>
): void {
  if (left.length === 0 || right.length === 0) {
    const result = prefix.cloneList()
    for (let i = 0; i < left.length; i++) {
      result.append(left.get(i)!)
    }
    for (let i = 0; i < right.length; i++) {
      result.append(right.get(i)!)
    }
    results.push(result)
    return
  }

  const
}
