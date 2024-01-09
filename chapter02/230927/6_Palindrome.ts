import { SinglyLinkedList, createList, printList } from '../lists'

// Palindrome: Implement a function to check if a linked list is a palindrome.
// Recursive goes from the botton so, use a stack to keep track and pop
// 1. Traverse slow and fast pointer
// 2. Add slow pointed value to curr
// 3. repeat til fast reached end
// 4. traverse slow to the end and compare with curr
//     - if mismatch return false
//     - if slow reach end and curr is empty, return true

// const word = ['a', 'b', 'c', 'c', 'b', 'a']
const wordEven = ['a', 'b', 'c', 'c', 'b', 'a']
const wordOdd = ['a', 'b', 'c', 'b', 'a']
const wordInvalid = ['v', 'c', 'c', 'c', 'b', 'a']
const wordEvenList = createList(wordEven)
const wordOddList = createList(wordOdd)
const wordInvalidList = createList(wordInvalid)
printList(wordEvenList)
printList(wordOddList)
printList(wordInvalidList)

// Reverse and compare
function palindrome(list: SinglyLinkedList): boolean {
  let curr: SinglyLinkedList | undefined = list
  let reverse = reverseList(list)

  while (curr && reverse) {
    if (curr.value !== reverse.value) return false
    curr = curr.next
    reverse = reverse.next
  }
  return true
}

function reverseList(list: SinglyLinkedList): SinglyLinkedList | undefined {
  let head: SinglyLinkedList | undefined = undefined
  let curr: SinglyLinkedList | undefined = list
  while (curr) {
    const node = new SinglyLinkedList(curr.value)
    node.next = head
    head = node
    curr = curr.next
  }

  return head
}

// console.log(palindrome(wordEvenList))
// console.log(palindrome(wordOddList))
// console.log(palindrome(wordInvalidList))

// recurse
type Result = { node: SinglyLinkedList | undefined; valid: boolean }

function palindromeRecurse(head: SinglyLinkedList | undefined): boolean {
  const length = listLength(head)
  const res = recurse(head, length)
  return res.valid

  function recurse(head: SinglyLinkedList | undefined, length: number): Result {
    if (!head || length <= 0) return { node: head, valid: true }
    else if (length === 1) return { node: head.next, valid: true }

    const res = recurse(head.next, length - 2)
    if (!res.valid || !res.node) return res

    res.valid = head.value === res.node.value
    res.node = res.node.next

    return res
  }
}

function listLength(list: SinglyLinkedList | undefined): number {
  let curr = list
  let length = 0
  while (curr) {
    length++
    curr = curr.next
  }

  return length
}

console.log(palindromeRecurse(wordEvenList))
console.log(palindromeRecurse(wordOddList))
console.log(palindromeRecurse(wordInvalidList))
