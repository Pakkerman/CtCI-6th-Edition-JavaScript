import { SinglyLinkedList, createList, printList } from '../lists'

// Given a circular linked list, implement an algroithm that returns the node in the beginning the loop
// Hints: #50, #69, #83, #90

// There are really two parts to this problem. First, detect if the linked list has a loop. Second, figure out where the loop starts.

const a = createLoop(createList(['A', 'B', 'C', 'D', 'E']))
const b = createList(['5', '8', '9', '2', '1'])

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
  return head
}

// Slow and fast
function loopDetection(
  head: SinglyLinkedList | undefined
): SinglyLinkedList | undefined {
  const nodeInLoop = anyNodeInLoop(head)
  if (!nodeInLoop) return undefined

  let runner: SinglyLinkedList | undefined = nodeInLoop
  const set = new Set<SinglyLinkedList>()
  while (runner) {
    set.add(runner)
    runner = runner.next
    if (runner === nodeInLoop) break
  }

  let curr = head
  while (curr) {
    if (set.has(curr)) break
    curr = curr.next
  }

  return curr
}

// Check if loop even exist
// Using the slow and fast runner method to determine if loop exist,
// Return the node inside the loop if found, undefined if not
function anyNodeInLoop(
  head: SinglyLinkedList | undefined
): SinglyLinkedList | undefined {
  let slow = head
  let fast = head
  while (slow && fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return slow
  }

  return undefined
}

console.log(loopDetection(a)?.value, 'is the start of the circle')
console.log(loopDetection(b), 'B has no cicle')

function loopDetectionSolution(
  head: SinglyLinkedList | undefined
): SinglyLinkedList | undefined {
  let slow = head
  let fast = head

  while (slow && fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) break
  }

  if (!fast) return undefined

  slow = head
  while (slow && fast) {
    slow = slow.next
    fast = fast.next
    if (slow === fast) return slow
  }

  return undefined
}

console.log(loopDetectionSolution(a)?.value, 'is the start of the loop')
