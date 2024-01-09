import type { ListNode, ListNodeValue } from './types'

export class SinglyLinkedList {
  value: ListNodeValue
  next?: SinglyLinkedList
  constructor(value: ListNodeValue = null) {
    this.value = value
    this.next = undefined
  }
}

export function unsortedList() {
  const values = [1, 6, 7, 3, 8]
  let root = new SinglyLinkedList()
  let curr = root
  for (let i = 0; i < values.length; i++) {
    const node = { value: values[i] }
    curr.next = node
    curr = curr.next
  }

  return root
}

export function unsortedListWithDup() {
  const values = [1, 8, 7, 8, 8, 3, 3]
  let root = new SinglyLinkedList()
  let curr = root
  for (let i = 0; i < values.length; i++) {
    const node = { value: values[i] }
    curr.next = node
    curr = curr.next
  }

  return root
}

export function partitionList() {
  const values = [3, 5, 8, 5, 10, 2, 1]
  let root = new SinglyLinkedList(null)
  let curr = root
  for (let i = 0; i < values.length; i++) {
    const node = { value: values[i] }
    curr.next = node
    curr = curr.next
  }

  return root
}

export function createList(arr: ListNodeValue[]): SinglyLinkedList {
  const head = new SinglyLinkedList()
  let curr = head
  for (let i = 0; i < arr.length; i++) {
    curr.value = arr[i]
    if (arr[i + 1]) curr.next = new SinglyLinkedList()
    if (curr.next) curr = curr.next
  }
  return head
}

export function printList(
  root: SinglyLinkedList | undefined,
  prefix: string = ''
): void {
  if (!root) return

  let curr: SinglyLinkedList | undefined = root
  if (root.value == null) curr = root.next

  const out: (ListNodeValue | null)[] = []

  while (curr) {
    out.push(curr.value)
    curr = curr.next
  }

  console.log('list: ', prefix, out.join(' => '))
}
