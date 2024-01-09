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

function palindromeList(list: SinglyLinkedList): boolean {
  let slow: SinglyLinkedList | undefined = list
  let fast: SinglyLinkedList | undefined = list

  const stack: T[] = []
  while (fast && fast.next && slow) {
    stack.push(slow.value as T)
    slow = slow.next
    fast = fast.next.next
  }

  if (fast && fast.next === undefined) slow = slow?.next

  while (slow) {
    if (slow.value !== stack.pop()) return false
    slow = slow.next
  }

  return true
}

// console.log('first method:')
// console.log(palindromeList(wordEvenList))
// console.log(palindromeList(wordOddList))
// console.log(palindromeList(wordInvalidList))
// Solution
// reverse the second half of the list and compare them
function reverselist(
  list: SinglyLinkedList | undefined
): SinglyLinkedList | undefined {
  if (!list) return undefined
  let head: SinglyLinkedList | undefined = undefined
  let curr = list
  while (curr) {
    let node = new SinglyLinkedList(curr.value)
    node.next = head
    head = node
    if (!curr.next) break
    curr = curr.next
  }
  return head
}

function isPalindrome(list: SinglyLinkedList | undefined): boolean {
  let reversed = reverselist(list)
  while (list && reversed) {
    if (list.value !== reversed.value) return false
    list = list.next
    reversed = reversed.next
  }
  return true
}

// console.log(isPalindrome(wordList))
type Result = { node: SinglyLinkedList | undefined; result: boolean }
function palindromeListRecursive(head: SinglyLinkedList | undefined): boolean {
  const res = recurse(head)
  return res.result

  function recurse(
    head: SinglyLinkedList | undefined,
    length: number = lengthOfList(head)
  ): Result {
    if (!head || length <= 0) return { node: head, result: true }
    else if (length === 1) return { node: head.next, result: true }

    const res = recurse(head.next, length - 2)
    if (!res.result || !res.node) return res

    res.result = res.node.value === head.value
    res.node = res.node.next
    return res
  }
}

function lengthOfList(node: SinglyLinkedList | undefined): number {
  let length = 0
  while (node) {
    length++
    node = node.next
  }

  return length
}

console.log(palindromeListRecursive(wordEvenList))
console.log(palindromeListRecursive(wordOddList))
console.log(palindromeListRecursive(wordInvalidList))
