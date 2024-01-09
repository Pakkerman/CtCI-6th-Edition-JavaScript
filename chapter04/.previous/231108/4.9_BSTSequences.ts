import { BST, TreeNode } from '../../util/BST'
import { SinglyLinkedList } from '../../util/SinglyLinkedList'
import { blue, yellow, green } from '../../util/ConsoleColors'

//        50
//     20    60
//  10   25    70
// 5 15      65  80
// const tree = new BST([50, 20, 60, 10, 25, 70, 5, 15, 65, 80])
// const tree = new BST([5, 2, 7, 1, 3, 6, 9])

export function allSequences(
  node: TreeNode<number> | undefined
): SinglyLinkedList<number>[] {
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
  first: SinglyLinkedList<number>,
  second: SinglyLinkedList<number>,
  results: SinglyLinkedList<number>[],
  prefix: SinglyLinkedList<number>
): void {
  if (first.length === 0 || second.length === 0) {
    const result = prefix.cloneList()
    let idx = 0
    while (idx < first.length) result.append(first.get(idx++)!)
    idx = 0
    while (idx < second.length) result.append(second.get(idx++)!)
    results.push(result)
    return
  }

  const firstHead = first.removeAtHead()!
  prefix.append(firstHead)
  weaveLists(first, second, results, prefix)
  prefix.removeAtTail()
  first.prepend(firstHead)

  const secondHead = second.removeAtHead()!
  prefix.append(secondHead)
  weaveLists(first, second, results, prefix)
  prefix.removeAtTail()
  second.prepend(secondHead)
}

// const weaved = weaveList([1, 2], [3, 4])
// console.log(weaved)

// function weaveList(a: number[], b: number[]): number[][] {
//   const out: number[][] = []
//   recurse(a, b)
//   return out

//   function recurse(a: number[], b: number[], curr: number[] = []): void {
//     if (a.length === 0 || b.length === 0) {
//       out.push([...curr, ...a, ...b])
//       return
//     }

//     recurse(a.slice(1), b, [...curr, a[0]])
//     recurse(a, b.slice(1), [...curr, b[0]])
//   }
// }
