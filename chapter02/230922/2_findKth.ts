// Return Kth to Last: Implement an algorithm to find the kth to last element of a singly linked list. Hints: #8, #25, #47, #67, # 726

import { printList, unsortedList } from '../lists'
import { ListNode, ListNodeValue } from '../types'

const list = unsortedList()
printList(list)

// 2 pointers and offset fast and slow with K
// when fast reaches the end return slow pointer

// runtime: O(N)
// space:(1)
function findKthToLast(root: ListNode, k: number): ListNodeValue | undefined {
  let slow = root.next
  let fast = root.next

  let count = 0
  for (let i = 0; i < k && fast; i++) {
    count++
    fast = fast.next
  }

  if (k === 0) return fast?.value
  if (count < k) return undefined

  while (slow && fast) {
    slow = slow.next
    fast = fast.next
  }

  return slow?.value
}

function findKthToLastRecursive(
  root: ListNode,
  k: number
): ListNodeValue | undefined {
  if (!root.next) return undefined

  let out: ListNodeValue | undefined = undefined
  work(root.next)

  function work(curr: ListNode | undefined): number {
    if (!curr) return 0
    const idx: number = work(curr.next)
    if (idx === k) out = curr.value
    return idx + 1
  }

  return out
}

console.log(findKthToLastRecursive(list, 65))
console.log(findKthToLastRecursive(list, 4))
console.log(findKthToLastRecursive(list, 0))
console.log(findKthToLastRecursive(list, -1))
console.log(findKthToLastRecursive(list, 3))
