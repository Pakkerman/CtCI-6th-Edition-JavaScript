import { BST, TreeNode } from '../../util/BST'
import { SinglyLinkedList } from '../../util/SinglyLinkedList'
import { blue, yellow, green } from '../../util/ConsoleColors'

//        50
//     20    60
//  10   25    70
// 5 15      65  80
// const tree = new BST([50, 20, 60, 10, 25, 70, 5, 15, 65, 80])
// const tree = new BST([2, 1, 3])
// const out = allSequences(tree.root)
// console.log(out.map((item) => item.printList()))

// function allSequences(
//   node: TreeNode<number> | undefined
// ): Array<SinglyLinkedList<number>> {}

// function weaveLists(
//   left: SinglyLinkedList<number>,
//   right: SinglyLinkedList<number>,
//   results: SinglyLinkedList<number>[],
//   prefix: SinglyLinkedList<number>
// ): void {}

function generateAllWeavedLists(a: number[], b: number[]): number[][] {
  const out: number[][] = []

  function recurse(a: number[], b: number[], curr: number[] = []) {
    if (a.length === 0 && b.length === 0) {
      out.push(curr)
      return
    }

    if (a.length > 0) {
      const newPrefix = [...curr, a[0]]
      recurse(a.slice(1), b, newPrefix)
    }

    if (b.length > 0) {
      const newPrefix = [...curr, b[0]]
      recurse(a, b.slice(1), newPrefix)
    }
  }

  recurse(a, b)
  return out
}

// Example usage:
const list1 = [1, 2]
const list2 = [4, 5]

const allWeavedLists = generateAllWeavedLists(list1, list2)
console.log(allWeavedLists)
