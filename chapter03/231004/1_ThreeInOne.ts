import { Stack } from './stacks'

class StackInfo {
  public start: number
  public size: number
  public capacity: number

  constructor(start: number, capacity: number) {
    this.start = start
    this.capacity = capacity
  }

  isWithinStackCapacity(index: number):boolean{
    if(idx < 0 || )
  }

  lastCapacityIndex(): number {
    return adjustIndex(this.start + this.capacity - 1)
  }

  lastElementIndex(): number {
    return adjustIndex(this.start + this.size - 1)
  }

  isEmpty(): boolean {
    return this.size === 0
  }
  isFull(): boolean {
    return this.size === this.capacity
  }
}

class MultiStack {
  private info: Array<StackInfo>
  private values: number

  constructor(numberOfStackls: number, defaultSize: number) {
    this.info = new StackInfo[numberOfStackls]()
    for (let i = 0; i < numberOfStackls; i++) {
      this.info[i] = new StackInfo(defaultSize * i, defaultSize)
    }
    this.values = numberOfStackls * defaultSize
  }
}

const s = new MultiStack()

s.push(1)
s.push(2)
s.push(3)
s.push(4)

s.pop()
s.popAt(0)

s.print()
