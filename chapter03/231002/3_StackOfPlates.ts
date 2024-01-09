// Stack of Plates: Imagine a (literal) stack of plates. If the stack gets too high, it might topple. Therefore, in real life, we would likely start a new stack when the previous stack exceeds some threshold. Implement a data structure SetOfStacks that mimics this. SetOfStacks should be composed of several stacks and should create a new stack once the previous one exceeds capacity. SetOfStacks. push () and SetOfStacks. pop () should behave identically to a single stack (that is, pop ( ) should return the same values as it would if there were just a single stack).
// FOLLOW UP
// Implement a function popAt(int index) which performs apopoperation on a specific sub-stack.
// Hints: #64, #87

// A super stack that has a fix capacity and will start a new stack if one stack hits its limit.
// Using a matrix, that the outer pointer to keep track which stack is currently being use,
// and push and pop like normal stack with the inner stack

class Stack {
  public length: number
  public capacity: number
  private data: Array<number | undefined>

  constructor() {
    this.length = 0
    this.capacity = 3
    this.data = new Array(this.capacity).fill(undefined)
  }

  push(value: number): void {
    if (this.isFull()) throw new Error('Stack is full!')
    this.data[this.length] = value
    this.length++
  }

  pop(): number | undefined {
    if (this.isEmpty()) throw new Error('Stack is already empty')
    const out = this.data[this.length - 1]
    this.data[this.length - 1] = undefined
    this.length--

    return out
  }

  isFull(): boolean {
    return this.length === this.capacity
  }

  isEmpty(): boolean {
    return this.length === 0
  }
}

class Stacks {
  public length: number
  private lastStackIdx: number
  private stacks: Array<Stack>

  constructor() {
    this.length = 1
    this.lastStackIdx = 0
    this.stacks = []
    this.stacks.push(new Stack())
  }

  push(value: number): void {
    const curr = this.stacks[this.lastStackIdx]
    if (curr.isFull()) {
      this.stacks.push(new Stack())
      this.lastStackIdx++
    }
    this.stacks[this.lastStackIdx].push(value)
    this.length++
  }

  pop(): number | undefined {
    if (this.length === 0) return undefined
    const out = this.stacks[this.lastStackIdx].pop()
    this.length--
    if (this.stacks[this.lastStackIdx].isEmpty()) {
      this.stacks.pop()
      this.lastStackIdx--
    }

    return out
  }

  popAt(idx: number): number | undefined {
    // TODO
  }

  print(): void {
    console.log(this.stacks)
  }
}

const s = new Stacks()

for (let i = 0; i < 10; i++) s.push(i)

console.log(s.pop())
for (let i = 0; i < 5; i++) s.push(i)
s.print()
console.log(s.pop())
console.log(s.pop())
console.log(s.pop())
console.log(s.pop())
console.log(s.pop())
