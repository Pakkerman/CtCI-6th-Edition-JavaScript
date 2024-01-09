export class Stack<T> {
  public length: number
  private capacity: number
  private data: Array<T | undefined>
  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.data = new Array(this.capacity).fill(undefined)
  }

  push(value: T): void {
    if (this.isFull()) throw new Error(`Capacity reached, cannot push ${value}`)
    this.length++
    this.data[this.length - 1] = value
  }
  pop(): T | undefined {
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

  peek(): T | undefined {
    return this.data[this.length - 1]
  }
  print(): void {
    console.log(this.data)
  }
}
