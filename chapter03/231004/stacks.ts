export class Stack<T> {
  private length: number
  private capacity: number
  private data: Array<T | undefined>
  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.data = new Array(this.capacity).fill(undefined)
  }

  push(value: T): void {
    if (this.isFull()) throw new Error('stack full')
    this.data[this.length] = value
    this.length++
  }
  pop(): T | undefined {
    if (this.isEmpty()) return undefined
    const out = this.data[this.length - 1]
    if (!out) return undefined
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
}
