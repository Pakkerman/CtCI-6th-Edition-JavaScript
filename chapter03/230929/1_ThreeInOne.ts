// Three in One: Describe how you could use a single array to implement three stacks.
// Hints: #2, #72, #38, #58

// 1. use % operator?
// use mod 0, 1, 2 to differentiate different stacks, this will require that the array to be fill with bunch of empty items if one only stack is very long

// 2. Use a array to hold 3 stacks' tail? and use 3 linked list

// 3. Prefix the values to identify which stack the item is belong to.

// 4. Slice array into 3 parts? This will be expensive to manage, only the stack in the end will have constant poping,

// 5. Array has constant access to items using index, maybe prefix value with the next item in the stack with index?

class ThreeInOnePrefixed<T extends string> {
  private length: number
  private capacity: number
  private data: Array<T>

  constructor() {
    this.length = 0
    this.capacity = 3
    this.data = new Array(this.capacity).fill(undefined)
  }

  add(value: T, stack: number): string {
    const suffixed = this.suffix(value, stack)

    this.length++
    this.resize()
    this.data[this.length - 1] = suffixed

    console.log(this.data)
    return `value: ${value} inserted to stack ${stack}`
  }
  pop(stack: number): T | undefined {
    let out: T | undefined = undefined
    for (let i = this.length; i >= 0; i--) {
      if (this.data[i]?.[this.data[i]?.length - 1] !== stack.toString())
        continue

      out = this.data[i]?.slice(0, -1) as T
      this.length--
      if (this.length === 0) return out
      this.data[i] = this.data[this.length]
      this.data[this.length] = undefined
      console.log(this.data)
      return out
    }

    return undefined
  }

  private resize(): void {
    if (this.length < this.capacity) return

    const data = this.data
    this.data = new Array((this.capacity *= 2)).fill(undefined)

    for (let i = 0; i < this.length; i++) {
      this.data[i] = data[i]
    }

    console.log('resized')
  }

  private suffix(value: T, suffix: number): T {
    return (value + suffix.toString()) as T
  }
}

const three = new ThreeInOnePrefixed()
three.add('450', 0)
three.add('20', 1)
three.add('5', 1)
three.add('500', 2)
three.add('33', 0)
three.add('355', 2)
three.add('7', 1)
console.log(three.pop(1))
console.log(three.pop(1))
console.log(three.pop(1))
