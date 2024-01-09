// Stack of Plates: Imagine a (literal) stack of plates. If the stack gets too high, it might topple. Therefore, in real life, we would likely start a new stack when the previous stack exceeds some threshold. Implement a data structure SetOfStacks that mimics this. SetOfStacks should be composed of several stacks and should create a new stack once the previous one exceeds capacity. SetOfStacks. push () and SetOfStacks. pop () should behave identically to a single stack (that is, pop ( ) should return the same values as it would if there were just a single stack).
// FOLLOW UP
// Implement a function popAt(int index) which performs apopoperation on a specific sub-stack.
// Hints: #64, #87

// A super stack that has a fix capacity and will start a new stack if one stack hits its limit.
// Using a matrix, that the outer pointer to keep track which stack is currently being use,
// and push and pop like normal stack with the inner stack

export class Stack {
  public length: number
  private capacity: number
  private data: Array<number | undefined>
  constructor() {
    this.length = 0
    this.capacity = 3
    this.data = new Array(this.capacity).fill(undefined)
  }

  push(value: number): void {
    if (this.isFull()) throw new Error('Capacity reached, cannot push', value)
    this.length++
    this.data[this.length - 1] = value
  }
  pop(): number | undefined {
    if (this.isEmpty()) throw new Error('Stack is empty')
    const out = this.data[this.length - 1]
    this.data[this.length - 1] = undefined
    this.length--
    return out
  }

  isEmpty(): boolean {
    return this.length === 0
  }

  isFull(): boolean {
    return this.length === this.capacity
  }
  print(): void {
    console.log(this.data)
  }
}

class Stacks {
  public length: number
  private lastStackIdx: number
  private data: Array<Stack>

  constructor() {
    this.length = 0
    this.lastStackIdx = 0
    this.data = []
    this.data.push(new Stack())
  }

  push(value: number): void {
    let curr = this.data[this.lastStackIdx]
    if (curr.isFull()) {
      this.data.push(new Stack())
      this.length++
      this.lastStackIdx++
      curr = this.data[this.lastStackIdx]
    }
    curr.push(value)
  }
  pop(): number | undefined {
    if (this.length === 0) return undefined
    if (this.data[this.lastStackIdx].isEmpty()) {
      this.data.pop()
      this.length--
      this.lastStackIdx--
    }
    const curr = this.data[this.lastStackIdx]
    const out = curr.pop()

    return out
  }
  popAt(idx: number): number | undefined {
    if (!this.data[idx]) return undefined
    const out = this.data[idx].pop()

    if (this.data[idx].isEmpty()) {
      this.lastStackIdx--
      for (let i = idx; i < this.length; i++) this.data[i] = this.data[i + 1]
      this.data.pop()
      this.length--
    }

    console.log(this.lastStackIdx, 'idx')

    return out
  }

  print(): void {
    this.data.forEach((item) => item.print())
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

console.log(s.pop())
console.log(s.pop())
console.log(s.pop())

console.log(s.popAt(0))
console.log(s.popAt(0))
console.log(s.popAt(0))

s.push(1)
s.push(2)
s.push(3)

s.popAt(0)
s.pop()
s.pop()

s.print()
