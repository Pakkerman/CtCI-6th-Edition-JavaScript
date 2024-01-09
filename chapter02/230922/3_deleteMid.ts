// Delete Middle Node: Implement an algorithm to delete a node in the middle (i.e., any node but the first and last node, not necessarily the exact middle) of a singly linked list, given only access to that node.
// Input: the node c from the linked list a - >b- >c - >d - >e- >f
// Result: nothing is returned, but the new linked list looks like a - >b- >d - >e- >f
// Hints: #72

import { printList, unsortedList } from './lists'
import { ListNode, ListNodeValue } from './types'

const list = unsortedList()
printList(list)

// so just delete the node given?
// just node.next = node.next.next and done? seems too simple
// what is the catch?
// no catch, pretty straightforward, just copy the next value and do node.next = node.next.next
// and mark the value deleted if it is the last node

function deleteNode(node: ListNode | undefined): void {
  if (!node) return
  if (node.next) {
    node.value = node.next.value
    node.next = node.next.next
  }
  node.value = 'deleted'
}

let midNode = list.next
for (let i = 0; i < 4 && midNode; i++) {
  midNode = midNode.next
}

printList(list)
deleteNode(midNode)
printList(list)
