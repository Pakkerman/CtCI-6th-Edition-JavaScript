import { SinglyLinkedList, createList, printList } from '../lists'

// Given a circular linked list, implement an algroithm that returns the node in the beginning the loop
// Hints: #50, #69, #83, #90

// There are really two parts to this problem. First, detect if the linked list has a loop. Second, figure out where the loop starts.

const a = createList(['A', 'B', 'C', 'D', 'E'])
const b = createList(['A', 'B', 'C', 'D', 'E'])
function createLoop(
  head: SinglyLinkedList | undefined
): SinglyLinkedList | undefined {
  if (!head) return undefined

  let curr: SinglyLinkedList | undefined = head
  for (let i = 0; curr && i < 2; i++) curr = curr.next

  const loopStart = curr

  let tail = curr
  while (curr) {
    tail = curr
    curr = curr.next
  }

  if (tail) tail.next = loopStart
  return tail
}

// Slow and fast
function loopDetection(
  head: SinglyLinkedList | undefined
): SinglyLinkedList | undefined {
  let slow = head
  let fast = head

  // Check if loop even exist
  while (slow && fast && fast.next) {
    if (slow === fast) return slow
    slow = slow.next
    fast = fast.next
  }

  if (!slow || !fast) return undefined
}

printList(loopDetection(createLoop(a)))
printList(loopDetection(b))
