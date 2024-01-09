import { SinglyLinkedList, createList, printList } from '../lists'

const a = createList([7, 1, 6])
const b = createList([5, 9, 2])
printList(a)
printList(b)

// Use a array to keep track digits
function sumList(
  a: SinglyLinkedList | undefined,
  b: SinglyLinkedList | undefined,
  carry: number
): SinglyLinkedList | undefined {
  if (!a && !b && carry === 0) return undefined

  const node = new SinglyLinkedList()
  let value = carry
  if (a) value += +a.value
  if (b) value += +b.value

  // value += a ? +a.value : 0
  // value += b ? +b.value : 0

  node.value = value % 10

  const next = sumList(
    a ? a.next : undefined,
    b ? b.next : undefined,
    value >= 10 ? 1 : 0
  )

  node.next = next
  return node
}

printList(sumList(a, b).next)
