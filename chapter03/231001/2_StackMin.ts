// Stack Min: How would you design a stack which, in addition to push and pop, has a function min which returns the minimum element? Push, pop and min should all operate in 0(1) time.
// Hints: #27, #59, #78
// - Observe that the minimum element doesn't change very often. It only changes when a smaller element is added, or when the smallest element is popped.
// - What if we kept track of extra data at each stack node? What sort of data might make it easier to solve the problem?
// - Consider having each node know the minimum of its "substack" (all the elements beneath it, including itself).

type MinStackNode = {
  value: number
  prev?: MinStackNode
  min: number
}

class MinStack {
  public length: number
  private head?: MinStackNode
  private tail?: MinStackNode
  private min: number
  constructor() {
    this.length = 0
    this.head = this.tail = undefined
    this.min = Infinity
  }

  push(value: number): void {
    this.min = value < this.min ? value : this.min
    const node: MinStackNode = { value, min: this.min }

    this.length++
    if (!this.tail) {
      this.tail = this.head = node
      return
    }

    node.prev = this.tail
    this.tail = node
  }

  pop(): number | undefined {
    if (!this.tail) return undefined
    const out = this.tail.value
    this.length--
    if (this.length === 0) {
      this.head = this.tail = undefined
      return out
    }

    return out
  }

  getMin(): number | undefined {
    return this.tail?.min
  }
}

const stack = new MinStack()
stack.push(1)
stack.push(2)
console.log(stack.getMin())
stack.push(3)
stack.push(0)
console.log(stack.getMin())
