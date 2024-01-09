import { BST, TreeNode } from '../../util/BST'
import { SinglyLinkedList } from '../../util/SinglyLinkedList'

//        50
//     20    60
//  10   25    70
// 5 15      65  80
const tree = new BST([50, 20, 60, 10, 25, 70, 5, 15, 65, 80])
console.log(tree.root)

function allSequences(
  node: TreeNode<number> | undefined
): Array<SinglyLinkedList<number>> {
  const out: SinglyLinkedList<number>[] = []
  if (!node) return out

  const prefix = new SinglyLinkedList<number>()
  prefix.prepend(node.value) // add root to the result

  const left = allSequences(node.left)
  const right = allSequences(node.right)

  for (let i = 0; i < left.length; i++) {
    for (let k = 0; k < right.length; k++) {
      const weaved: SinglyLinkedList<number>[] = []
      weavedLists(left, right, weaved, prefix)
      for (const item of weaved) out.push(item)
    }
  }
  return out
}

function weavedLists(
  left: SinglyLinkedList<number>[],
  right: SinglyLinkedList<number>[],
  weaved: SinglyLinkedList<number>[],
  prefix: SinglyLinkedList<number>
): void {
  if (left.length === 0 || right.length === 0) {
    const out = prefix.cloneList()
    for(let i = 0 ; i < )
  }
}
