// Queue via Stacks: Implement a MyQueue class which implements a queue using two stacks.
// Hints: #98, #114

// The major difference between a queue and a stack is the order of elements. A queue removes the oldest item and a stack removes the newest item. How could you remove the oldest item from a stack if you only had access to the newest item?

// We can remove the oldest item from a stack by repeatedly removing the newest item (inserting those into the temporary stack) until we get down to one element. Then, after we've retrieved the newest item, putting all the elements back. The issue with this is that doing several pops in a row will require 0 (N) work each time. Can we optimize for scenarios where we might do several pops in a row?

import { Stack } from './Stack'

class MyQueue<T> {
  private newest: Stack
  private oldest: Stack
  constructor() {
    this.newest = new Stack()
    this.oldest = new Stack()
  }

  add(value: number): void {
    this.newest.push(value)
  }

  private shift(): void {
    if (!this.oldest.isEmpty()) return
    while (!this.newest.isEmpty()) {
      this.oldest.push(this.newest.pop() as number)
    }
  }

  peek(): number | undefined {
    this.shift()
    return this.oldest.peek()
  }

  remove(): number | undefined {
    this.shift()
    return this.oldest.pop()
  }

  size() {
    return this.newest.length + this.oldest.length
  }
}
