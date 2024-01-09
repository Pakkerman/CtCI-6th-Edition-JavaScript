import type { ListNode, ListNodeValue } from '../types'
import { printList, unsortedListWithDup } from '../lists'

// Remove Dups: Write code to remove duplicates from an unsorted li nked list.

const list = unsortedListWithDup()
printList(list)

// runtime: O(N) - go through list once
// space: O(N) - Using a set to keep track of nodes
// modified: using while inner loop to account for connective dups and remove unlinked node
function removeDups(root: ListNode): void {
  if (!root) throw new Error('list is empty')

  const set = new Set<ListNodeValue>()
  let curr = root.next
  while (curr) {
    set.add(curr.value)
    while (curr.next && set.has(curr.next.value)) {
      let next = curr.next
      curr.next = curr.next.next
      next.next = undefined
    }
    curr = curr.next
  }
}

function removeDupsRaw(root: ListNode): void {
  if (!root) throw new Error('list is empty')

  let curr = root.next
  while (curr) {
    let scan = curr.next

    while (scan) {
      if (!scan.next && scan.value === curr.value) {
        curr.next = undefined
        break
      }

      if (scan?.next?.value === curr.value) {
        scan.next = scan.next.next
      } else {
        scan = scan.next
      }
    }

    curr = curr.next
  }
}

removeDupsRaw(list)
printList(list)
