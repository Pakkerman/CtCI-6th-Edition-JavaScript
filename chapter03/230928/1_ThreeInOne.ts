// Three in One: Describe how you could use a single array to implement three stacks.
// Hints: #2, #72, #38, #58

// 1. use % operator?
// use mod 0, 1, 2 to differentiate different stacks, this will require that the array to be fill with bunch of empty items if one only stack is very long

// 2. Use a array to hold 3 stacks' tail? and use 3 linked list

// 3. Prefix the values to identify which stack the item is belong to.

// 4. Slice array into 3 parts? This will be expensive to manage, only the stack in the end will have constant poping,

// 5. Array has constant access to items using index, maybe prefix value with the next item in the stack with index?

class ThreeInOnePrefixed<T extends string | undefined> {
  private capacity: number
  private data: Array<T>

  constructor() {
    this.capacity = 3
    this.data = new Array(this.capacity).fill(undefined)
  }

  add(value: T, stack: number): T | undefined {}
  pop(stack: number): T | undefined {}
  private resize():void{
    for(let i = 0 ; i )
  }
}
