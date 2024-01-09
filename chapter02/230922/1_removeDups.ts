import type { ListNode, ListNodeValue } from '../types'
import { printList, unsortedListWithDup } from '../lists'

// using a hashmap
// runtime: O(N)
// space: O(N)
function removeDupHashmap(root: ListNode): ListNode {
  let curr: ListNode | undefined = root.next
  const set = new Set()
  while (curr) {
    set.add(curr.value)
    if (curr.next && set.has(curr.next.value)) {
      curr.next = curr.next.next
    }
    curr = curr.next
  }

  return root
}

// printList(removeDupHashmap(unsortedListWithDup()))
// runtime: O(N²)
function removeDupTwoPointer(root: ListNode): ListNode {
  let curr = root.next
  while (curr) {
    scanDups(curr.next, curr.value)
    curr = curr.next
  }

  function scanDups(scan: ListNode | undefined, value: ListNodeValue): void {
    if (!scan) return
    while (scan) {
      if (scan.next && scan.next.value === value) {
        scan.next = scan.next.next
      }
      scan = scan.next
    }
  }

  return root
}

printList(removeDupTwoPointer(unsortedListWithDup()))
