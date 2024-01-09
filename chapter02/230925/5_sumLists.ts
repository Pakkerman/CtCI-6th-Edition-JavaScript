import { SinglyLinkedList, createList, printList } from '../lists'

const a = createList([7, 1, 6])
const b = createList([5, 9, 2])
printList(a)
printList(b)

// Use a array to keep track digits
function sumLists(
  rootA: SinglyLinkedList,
  rootB: SinglyLinkedList
): SinglyLinkedList {
  const sumA: number[] = []
  const sumB: number[] = []

  let currA = rootA.next
  let currB = rootB.next
  while (currA) {
    sumA.push(currA.value as number)
    currA = currA.next
  }
  let idx = 0
  while (currB) {
    sumB.push(currB.value as number)
    currB = currB.next
  }

  const a = sumA.reverse().join('')
  const b = sumB.reverse().join('')

  return createList((parseInt(a) + parseInt(b)).toString().split(''))
}

function sumListRecursion(
  a: SinglyLinkedList | undefined,
  b: SinglyLinkedList | undefined,
  carry: number = 0
): SinglyLinkedList | undefined {
  if (!a && !b && carry === 0) return undefined

  let res = new SinglyLinkedList()

  let value = carry
  if (a) value += +a.value
  if (b) value += +b.value

  res.value = value % 10

  if (a || b) {
    const more = sumListRecursion(
      !a ? undefined : a.next,
      !b ? undefined : b.next,
      value >= 10 ? 1 : 0
    )

    res.next = more
    return res
  }
}

printList(sumListRecursion(a.next, b.next))
