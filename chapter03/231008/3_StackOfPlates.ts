// Stack of Plates: Imagine a (literal) stack of plates. If the stack gets too high, it might topple. Therefore, in real life, we would likely start a new stack when the previous stack exceeds some threshold. Implement a data structure SetOfStacks that mimics this. SetOfStacks should be composed of several stacks and should create a new stack once the previous one exceeds capacity. SetOfStacks. push () and SetOfStacks. pop () should behave identically to a single stack (that is, pop ( ) should return the same values as it would if there were just a single stack).

// push to stacks in order, pop in order,

import Stack from '../util/Stack'

export class Plates<T> {
  public length: number
  public capacity: number
  private stacks: Array<Stack<T>>
  constructor() {
    this.length = 0
    this.capacity = 3
    this.stacks = Array.from({ length: this.capacity }, () => new Stack<T>())
  }

  push(value: T): void {
    const idx = this.getStackIdxToPush()
    if (idx === -1) return
    this.stacks[idx].push(value)
    this.length++
  }
  pop(): T | undefined {
    const idx = this.getStackIdxToPop()
    const out = this.stacks[idx].pop()
    this.length--
    return out
  }

  popAt(idx: number): T | undefined {
    if (idx < 0 || this.capacity <= idx) return undefined
    if (this.stacks[idx].isEmpty()) return undefined
    const out = this.stacks[idx].pop()
    this.length--
    return out
  }

  private getStackIdxToPush(): number {
    let idx = 0
    while (this.stacks[idx].isFull()) {
      idx++
    }
    if (idx < 0 || this.capacity <= idx) return -1
    return idx
  }

  private getStackIdxToPop(): number {
    let idx = this.capacity - 1
    while (this.stacks[idx].isEmpty()) {
      idx--
    }
    if (idx < 0 || this.capacity <= idx) return -1
    return idx
  }

  print(): void {
    console.log('Print out stacks: ')
    for (let i = 0; i < this.stacks.length; i++) {
      this.stacks[i].print()
    }
  }
}
