import { SinglyLinkedList, createList, printList } from '../lists'
import { ListNodeValue } from '../types'

const a = createList([7, 1, 6])
const b = createList([5, 9, 2])
printList(a)
printList(b)

// use a array to keep digits
function sumList(
  a: SinglyLinkedList | undefined,
  b: SinglyLinkedList | undefined,
  carry: number = 0
): SinglyLinkedList | undefined {
  if (!a && !b && carry === 0) return undefined

  let value = carry
  if (a) value += a.value as number
  if (b) value += b.value as number
  const node = new SinglyLinkedList(value % 10)

  if (a || b) {
    const next = sumList(a?.next, b?.next, value >= 10 ? 1 : 0)
    node.next = next
  }
  return node
}

printList(sumList(a, b))
