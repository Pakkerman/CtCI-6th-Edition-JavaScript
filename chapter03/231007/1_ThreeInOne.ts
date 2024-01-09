// 3.1 Three in One: Describe how you could use a single array to implement three stacks.

// 1. Use a suffix system to throw all item on an array, and scan from the end to get the specific stack item to operate
//    - push: suffix the item first and then push into array
//    - pop: scan from the back and get the item that is belong to that stack and unsuffix
//  This method has the same problem that if the first 2 item is stack 1 and 2, and then the last 1000 item is belong to stack 3, if you pop from stack 1 or 2, you are fucked, that's O(N)

// 2. Divided 3 equal portions, and keep track of len and last item idx
//    - push: get the length of the substack, see if it is pushable, then push and move the last idx ptr
//    - pop: pop from the last item ptr
// Drawbacks:
//    - All stack will be equally sized, even the unused empty stack will be as long as the longest stack.
//    - This has almost no use cases, can't think of the reason why you will need to do this. Unless you are doing an embedded system, the memeory is limited, and you do some magic to make this a also a ring buffer situation,

// 3. Dynamically Resize the substack, and make it a circular buffer
// This is complex to do,
//    - push:
//    - pop:

class StackInfo {
  public start: number
  public size: number
  public capacity: number
  private totalLength: number
  constructor(createAtIdx: number, capacity: number, totalLength: number) {
    this.start = createAtIdx
    this.size = 0
    this.capacity = capacity
    this.totalLength = totalLength
  }

  isInBound(idx: number): boolean {
    if (idx < 0 || this.totalLength <= idx) return false
    else return true
  }

  lastCapacityIndex(): number {
    // Make it wrap
    return this.adjustIdx(this.start + this.capacity - 1)
  }

  lastElementIndex(): number {
    // Make it wrap
    return this.adjustIdx(this.start + this.size - 1)
  }

  isFull(): boolean {
    return this.size === this.capacity
  }
  isEmpty(): boolean {
    return this.size === 0
  }

  // This will % the idx and make it wrap around to the start using the total len of the multistack
  private adjustIdx(idx: number): number {
    return idx % this.totalLength
  }
}

class MultiStack {
  private values: Array<number | undefined>
  private info: Array<StackInfo>
  constructor(stackCount: number, stackCapacity: number) {
    // Init to be the total of stacks and their size, to put data, think of as data[]
    this.values = new Array(stackCount * stackCapacity)
    // Keeping track of stacks
    this.info = new Array(stackCount)
    for (let i = 0; i < stackCount; i++) {
      this.info[i] = new StackInfo(
        i * stackCapacity,
        stackCapacity,
        this.values.length
      )
    }
  }

  push(stack: number, value: number): void {
    if (!this.isValidStack(stack)) throw new Error('invalid stack')
    if (this.isMultiStackFull()) throw new Error('Fullstack')
    const curr = this.info[stack]
    if (curr.isFull()) this.expand(stack)
    curr.size++
    this.values[curr.lastElementIndex()] = value
    console.log('push: ', value, 'to: ', stack, this.values)
  }
  pop(stack: number): number | undefined {
    const curr = this.info[stack]
    if (curr.isEmpty()) return undefined
    const value = this.values[curr.lastElementIndex()]
    this.values[curr.lastElementIndex()] = undefined
    curr.size--

    console.log(`poped: ${value} from ${stack}`, this.values)
    return value
  }
  peek(stack: number): number | undefined {
    const currStack = this.info[stack]
    if (currStack.isEmpty()) return undefined
    return this.values[currStack.lastElementIndex()]
  }
  numberOfElements(): number {
    return this.info.reduce((acc, curr) => acc + curr.size, 0)
  }
  isMultiStackFull(): boolean {
    return this.numberOfElements() === this.values.length
  }

  // lastCapacityIdx(): number {
  //   return this.adjustIndex()
  // }
  // private adjustIndex(idx: number): number {}
  // private nextIdx(idx: number): number {}
  // private prevIdx(idx: number): number {}
  private shift(stack: number): void {
    const currStack = this.info[stack]
    if (currStack.size >= currStack.capacity) {
      const nextStack = (stack + 1) % this.info.length
      this.shift(nextStack)
      currStack.capacity++
    }

    let idx = currStack.start + currStack.size
    while (currStack.start < currStack.start + currStack.size - 1) {
      this.values[idx] = this.values[idx - 1]
      idx = idx - 1
    }
    this.values[currStack.start] = undefined
    currStack.start = (currStack.start + 1) % this.values.length
    currStack.capacity--
  }
  private expand(stack: number): void {
    this.shift((stack + 1) % this.info.length)
    this.info[stack].capacity++
  }

  private isValidStack(stack: number): boolean {
    if (stack < 0 || this.info.length <= stack) return false
    return true
  }
}

const s = new MultiStack(2, 3)
s.push(1, 1)
s.push(1, 1)
s.push(1, 1)
s.push(1, 1)
s.push(1, 1)
s.push(1, 1)
s.pop(1)
s.pop(1)
s.pop(1)
s.pop(1)
s.pop(1)
s.pop(1)
s.push(0, 0)
s.push(0, 0)
s.push(0, 0)
s.push(0, 0)
s.push(0, 0)
s.pop(0)
s.pop(0)
s.pop(0)
s.pop(0)
s.pop(0)
s.push(1, 1)
