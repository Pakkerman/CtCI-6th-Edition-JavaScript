// 3.4 Queue via Stacks: Implement a MyQueue class which implements a queue using two stacks

// Queue is first in first out
// we have 2 stacks
// initial state, two empty stacks: [], []
// now push stuff into MyQueue: [1, 2, 3], [], the items are pushed into the left stack
// and just push as normal with the left stack
// Now we need to get items out from 1, how to do this?
// pop and push all stuffl to the right queue,
// [], [3, 2, 1]
// and now popping right stack will be the same as a queue that is shifting out the first item
// [], [3, 2]
// now we push again with 3, 2 still in the right stack
// first we pop from the right and push to left
// [2, 3], []
// and now we can push again 4, 5
// [2, 3, 4, 5], []

// By pushing and pop from one to the other, we change the order of the stack, and therefore we can operate as if MyQueue is a normal queue, just underneath is 2 stack, sneaky

import Stack from '../util/Stack'

export class MyQueue<T> {
  public length: number
  private pushStack: Stack<T>
  private popStack: Stack<T>
  constructor() {
    this.length = 0
    this.pushStack = new Stack()
    this.popStack = new Stack()
  }

  enque(item: T): void {
    // console.log('to push mode: ')
    this.pushMode()
    this.pushStack.push(item)
    this.length++

    // this.pushStack.print('pushStack')
    // this.popStack.print('popStack')
  }

  deque(): T | undefined {
    // console.log('to pop mode: ')

    this.popMode()
    const out = this.popStack.pop()
    if (!out) return undefined
    this.length--

    // this.pushStack.print('pushStack')
    // this.popStack.print('popStack')

    return out
  }

  private pushMode(): void {
    while (!this.popStack.isEmpty()) {
      const item = this.popStack.pop()
      if (!item) break
      this.pushStack.push(item)
    }
  }
  private popMode(): void {
    while (!this.pushStack.isEmpty()) {
      const item = this.pushStack.pop()
      if (!item) break
      this.popStack.push(item)
    }
  }

  print(): void {
    console.log('Print MyQueue: ')
    this.pushStack.print()
    this.popStack.print()
  }
}
