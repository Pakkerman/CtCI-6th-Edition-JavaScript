export default class Stack<T> {
  public length: number
  public capacity: number
  private data: Array<T | undefined>
  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.data = new Array(this.capacity).fill(undefined)
  }

  push(value: T): void {
    this.length++
    this.resize()
    this.data[this.length - 1] = value
  }

  pop(): T | undefined {
    const out = this.data[this.length - 1]
    if (out === undefined) return undefined
    this.data[this.length - 1] = undefined
    this.length--
    if (this.length === 0) {
      this.resize()
      return out
    }

    return out
  }

  peek(): T | undefined {
    return this.data[this.length - 1]
  }

  isEmpty(): boolean {
    return this.length === 0
  }

  isFull(): boolean {
    return this.length === this.capacity
  }

  private resize(): void {
    if (this.length === 0) this.shrink()
    else this.grow()
  }
  private shrink(): void {
    this.capacity = 3
    this.data = new Array(this.capacity).fill(undefined)
  }

  private grow(): void {
    if (this.length <= this.capacity) return

    const data = this.data
    this.data = new Array((this.capacity *= 2)).fill(undefined)
    for (let i = 0; i < data.length; i++) {
      this.data[i] = data[i]
    }
  }

  print(label: string | undefined = undefined): void {
    if (label) label = label + ': '
    else label = 'print Stack: '

    console.log(
      label,
      this.data.filter((item) => item !== undefined)
    )
  }
}

/* TEST */

// const s = new Stack()
// s.push('a')
// s.push('b')
// s.push('c')
// s.print()
// console.log(s.isFull(), true)
// console.log(s.pop(), 'c')
// console.log(s.peek(), 'b')
// console.log(s.pop(), 'b')
// console.log(s.pop(), 'a')
// console.log(s.isEmpty(), true)
// s.print()
