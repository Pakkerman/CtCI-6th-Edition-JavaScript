import { SinglyLinkedList, createList, printList } from '../lists'

// Given a circular linked list, implement an algroithm that returns the node in the beginning the loop
// Hints: #50, #69, #83, #90

// There are really two parts to this problem. First, detect if the linked list has a loop. Second, figure out where the loop starts.

const a = createList(['A', 'B', 'C', 'D', 'E'])
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
  const nodeInsideLoop = anyNodeInLoop(head)
  if (!nodeInsideLoop) return undefined

  let runner = nodeInsideLoop as SinglyLinkedList | undefined
  const nodesInLoop: SinglyLinkedList[] = []
  while (runner) {
    if (runner) nodesInLoop.push(runner)
    runner = runner.next
    if (runner === nodeInsideLoop) break
  }

  let curr = head
  while (curr) {
    if (nodesInLoop.includes(curr)) break
    curr = curr.next
    console.log('what')
  }

  return curr
}

// Check if loop even exist
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

console.log(loopDetection(createLoop(a))?.value, 'is the start of the circle')
printList(loopDetection(b))
