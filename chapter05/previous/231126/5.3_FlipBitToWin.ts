// input: 11011101111

export function flip(input: number): number {
  if (input === 0) return 0
  const seq = getAlternatingSequences(input)
  return findLongestSequence(seq)
}

function getAlternatingSequences(input: number): number[] {
  const out: number[] = []

  let searching = 0
  let counter = 0
  for (let i = 0; i < 32; i++) {
    if ((input & 0b1) !== searching) {
      searching = input & 1
      out.push(counter)
      counter = 0
    }

    counter++
    input >>>= 1
  }

  out.push(counter)
  return out
}

function findLongestSequence(seq: number[]): number {
  let max = 0

  for (let i = 0; i < seq.length; i += 2) {
    const zeros = seq[i]
    const leftOnes = seq[i + 1] ?? 0
    const rightOnes = seq[i - 1] ?? 0

    let currentMax = 0
    if (zeros === 1) {
      currentMax = leftOnes + 1 + rightOnes
    } else if (zeros > 1) {
      currentMax = Math.max(leftOnes, rightOnes) + 1
    } else if (zeros === 0) {
      currentMax = Math.max(leftOnes, rightOnes)
    }

    max = Math.max(currentMax, max)
  }
  return max
}

// Constant space
// 11011101111
export function flipBitSolution(input: number): number {
  if (~input === 0) return 32

  let curr = 0
  let prev = 0
  let max = 1
  while (input) {
    console.log(input.toString(2).padStart(11, '0'), curr)
    console.log(input & 0b1)
    if ((input & 0b1) === 1) {
      // checking the first bit, 1101 & 0001, both first bits are 1 so we get 1
      curr++
      // add to the counter, because we encounter a 1
    } else if ((input & 0b1) === 0) {
      // checking the first bit if it is 0, by using 1110 & 0001, if one of them is zero will be 0, that is 0000
      prev = (input & 0b10) == 0 ? 0 : curr
      // checking the next bit, if it is 0 that means we can flip this one so we set prev to curr, and let this zero be seen as that can be flip and merge the left and right 1s
      console.log('prev', prev)
      curr = 0
    }
    max = Math.max(prev + curr + 1, max)
    // the first time we encounter zero, the curr value will be shift to prev, so only if we keep encounter 1s, we wont touch prev's value, now the next sequences of 1s will go into the first if statement, and we keep adding curr each time we encounter 1s, and the additional +1 is to account for the "flipped bit"
    input >>>= 1
    // shift all bits to the right and by using the logic shift, we dont really care about the number, we just need to get the sequence of bits, so it's okay to logic shift disregard the MSB and actually decimal number is being flip to positive if the MSB is 1 to begin with, we just want the look at the sequence.
  }
  return max
}

// 1101
// curr = 1
// sum = 1 + 1 + 0 = 1
// max(1, 1)

// 0110
// prev = curr = 1
// curr = 0
// sum = 1 + 0 + 1
// max(2, 1) > 2

// 0011
// curr = 1
// sum = 1 + 1 + 1
// max(3, 2) > 3

// 0001
// curr = 2
// sum = 2 + 1 + 1
// max(4, 3) > 4

export function flipBit(input: number): number {
  if (input === 0) return 0
  if (~input === 0) return 32

  let curr = 0
  let prev = 0
  let max = 1
  while (input) {
    if ((input & 0b1) === 1) {
      curr++
    } else if ((input & 0b1) === 0) {
      prev = (input & 0b10) === 0 ? 0 : curr
      curr = 0
    }

    max = Math.max(curr + prev + 1, max)
    input >>>= 1
  }

  return max
}
