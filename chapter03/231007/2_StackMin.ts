// Stack Min: How would you design a stack which, in addition to push and pop, has a function min which returns the minimum element? Push, pop and min should all operate in 0(1) time.
// Hints: #27, #59, #78
// - Observe that the minimum element doesn't change very often. It only changes when a smaller element is added, or when the smallest element is popped.
// - What if we kept track of extra data at each stack node? What sort of data might make it easier to solve the problem?
// - Consider having each node know the minimum of its "substack" (all the elements beneath it, including itself).

// Additional info about the min value at the item,

import Stack from '../util/Stack'

type ItemWithMin = {
  value: number
  min: number
}

class StackWithMin extends Stack {
  constructor() {
    super()
  }

  push(value: number): void {
    const item = { value, min: Math.min(value, this.getMin()) }
    super.push(item)
  }

  pop(): number {
    return super.pop()
  }

  getMin(): number {
    if (super.size() === 0) return Infinity
    return super.peek().min
  }
}

const s = new StackWithMin()

s.push(1)
s.push(2)
s.push(0)
console.log(s.getMin())
s.pop()
s.pop()
console.log(s.getMin())
s.pop()
console.log(s.getMin())

// Sum: Its just keeping track the min on the item, and if call return that, every item is a slice of time that keeps track of the min element of the entire stack up until that point, the min property in class
