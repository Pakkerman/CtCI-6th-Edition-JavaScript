// Sort Stack: Write a program to sort a stack such that the smallest items are on the top. You can use an additional temporary stack, but you may not copy the elements into any other data structure (such as an array). The stack supports the following operations: push, pop, peek, and isEmpty.
// Hints: #75, #32, #43

// Alternatively, you could pick a random depth to traverse to and then randomly traverse, stopping when you get to that depth. Think this through, though. Does this work?

// Imagine your secondary stack is sorted. Can you insert elements into it in sorted order? You might need some extra storage. What could you use for extra storage?

// Keep the secondary stack in sorted order, with the biggest elements on the top. Use the primary stack for additional storage.

class StackTopMin {
  public length: number
  private capacity: number
  private min: number
  private data: Array<number | undefined>
  constructor() {
    this.length = 0
    this.capacity = 3
    this.min = Infinity
    this.data = new Array(this.capacity).fill(undefined)
  }

  push(value: number): void {}
  pop(): number | undefined {}
  peek(): number | undefined {
    return this.data[this.length - 1]
  }
  isEmpty(): boolean {
    return this.length === 0
  }
}
