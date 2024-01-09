// Sort Stack: Write a program to sort a stack such that the smallest items are on the top. You can use an additional temporary stack, but you may not copy the elements into any other data structure (such as an array). The stack supports the following operations: push, pop, peek, and isEmpty.
// Hints: # 75, #32, #43

// Try 2 stacks
// [3, 1, 0],  []
// and now insert 2 into the stack, how to keep 1 at the top?
// if the top element is smaller than new item, push to the temp stack
// [3, 1],  [0]
// [3],  [0, 1]
// keep doing this until the top item is bigger than item, now push 2 to stack
// [3, 2], [0 ,1]
// pop from the temp stack and push to the stack
// [3, 2, 1], [0]
// [3, 2, 1, 0], []

import Stack from '../util/Stack'

export class SortStack<T extends number> {
  private stack: Stack<T>
  private temp: Stack<T>

  constructor() {
    this.stack = new Stack<T>()
    this.temp = new Stack<T>()
  }

  push(item: T): void {
    this.sort(item)
    this.stack.push(item)

    while (!this.temp.isEmpty()) {
      this.stack.push(this.temp.pop()!)
    }
  }
  pop(): T | undefined {
    return this.stack.pop()
  }

  size(): number {
    return this.stack.length
  }

  peek(): T | undefined {
    return this.stack.peek()
  }

  isEmpty(): boolean {
    return this.stack.isEmpty()
  }

  private sort(item: T): void {
    while (!this.stack.isEmpty()) {
      const peek = this.stack.peek()
      if (peek === undefined) break
      if (peek > item) break
      this.temp.push(this.stack.pop()!)
    }
  }

  print(): void {
    console.log(this.stack.print())
  }
}
