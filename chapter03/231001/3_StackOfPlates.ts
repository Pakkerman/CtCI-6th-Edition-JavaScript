// Stack of Plates: Imagine a (literal) stack of plates. If the stack gets too high, it might topple. Therefore, in real life, we would likely start a new stack when the previous stack exceeds some threshold. Implement a data structure SetOfStacks that mimics this. SetOfStacks should be composed of several stacks and should create a new stack once the previous one exceeds capacity. SetOfStacks. push () and SetOfStacks. pop () should behave identically to a single stack (that is, pop ( ) should return the same values as it would if there were just a single stack).
// FOLLOW UP
// Implement a function popAt(int index) which performs apopoperation on a specific sub-stack.
// Hints: #64, #87

// A super stack that has a fix capacity and will start a new stack if one stack hits its limit.

class Stacks {
  private length: number
  private stackSize: number
  private currStack: number
  private stacks: Array<Array<number>>
  constructor() {
    this.length = 0
    this.stackSize = 3
    this.currStack = 0
    this.stacks = new Array(1).fill(new Array(this.stackSize).fill(undefined))
  }

  push(value: number): void {
    const stackIdx = this.getCurrentStack()
    if (!this.stacks[stackIdx]) {
      this.stacks.push(new Array(this.stackSize).fill(undefined))
    }

    this.stacks[stackIdx][this.length % this.stackSize] = value
    this.length++

    console.log(this.stacks)
  }

  private getCurrentStack(): number {
    return Math.floor(this.length / this.stackSize)
  }
}

const s = new Stacks()

s.push(1)
s.push(2)
s.push(3)
s.push(4)
s.push(5)
s.push(6)
s.push(7)
