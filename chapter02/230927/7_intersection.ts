// Given two singly linked lists, determine if the two lists intercet. Return the intersecting node. Note that the intersection is defined based on reference, not value. That is, if the kth node of the first linked list is the exact same node (by reference) as the jth node of the second list, then they are intersecting.

import { SinglyLinkedList, createList, printList } from '../lists'

type Node = SinglyLinkedList

const listA = createList([3, 1, 5, 9, '7: intersect', 2, 1])
const listB = createList([4, 6])

function createIntersectingLists(
  a: SinglyLinkedList | undefined,
  b: SinglyLinkedList | undefined
): { a: SinglyLinkedList; b: SinglyLinkedList } {
  const headA = b
  const headB = a
  for (let i = 0; a && i < 4; i++) {
    a = a.next
  }

  while (b) {
    if (!b.next) {
      b.next = a
      break
    }
    b = b.next
  }
  return { a: headA!, b: headB! }
}

const { a, b } = createIntersectingLists(listA, listB)

printList(a)
printList(b, '          ')
console.log('intersecting at 7')

// For each node in a, traverse b from head to tail and find intersection
// 1. Get tail and size for each string
// 2. Jump forward diff of the len on the longer list
// 3. Walk 2 lists forward until 2 lists' next is point to the same node

function findIntersection(
  a: Node | undefined,
  b: Node | undefined
): Node | undefined {
  if (!a || !b) return undefined

  const [tailA, lengthA] = getTailAndLength(a)
  const [tailB, lengthB] = getTailAndLength(b)

  if (tailA.value !== tailB.value) return undefined

  if (lengthB > lengthA) [a, b] = [b, a]

  a = jumpForward(a, Math.abs(lengthA - lengthB))

  while (a && b) {
    if (a.value === b.value) return a
    a = a.next
    b = b.next
  }

  return undefined
}

function getTailAndLength(
  node: Node | undefined
): [tail: Node, length: number] {
  if (!node) throw new Error('input is undefined')
  let length = 0
  let tail: Node = new SinglyLinkedList()
  while (node) {
    tail = node
    node = node.next
    length++
  }

  return [tail, length]
}

function jumpForward(node: Node | undefined, diff: number): Node | undefined {
  for (let i = 0; node && i < diff; i++) node = node.next
  return node
}

const c = createList([1, 2, 3])
const d = createList([3, 4, 5, 5, 2])
console.log(findIntersection(a, b)?.value || 'no intersection')
console.log(findIntersection(c, d)?.value || 'no intersection')
