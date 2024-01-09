// Partition: Write code to partition a linked list around a value x, such that all nodes less than x come before all nodes greater than or equal to x. If x is contained within the list, the values of x only need to be after the elements less than x (see below). The partition element x can appear anywhere in the "right partition"; it does not need to appear between the left and right partitions.

// Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1 [partition = 5]
// Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8

import { SinglyLinkedList, partitionList, printList } from '../lists'
import { ListNode, ListNodeValue } from '../types'

const list = partitionList()
printList(list)

function partition(root: SinglyLinkedList, partition: number): ListNode {
  let curr = root.next
  let head = root.next as ListNode
  let tail = root.next as ListNode
  while (curr) {
    const next = curr.next
    if (+curr.value < partition) {
      curr.next = head
      head = curr
    } else {
      tail.next = curr
      tail = curr
    }
    curr = next
  }

  tail.next = undefined
  console.log(head)

  return head as ListNode
}

printList(partition(list, 5))
