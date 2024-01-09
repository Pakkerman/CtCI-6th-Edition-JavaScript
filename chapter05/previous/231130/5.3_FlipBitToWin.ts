// input: 11011101111

export function flip(input: number): number {
  if (input === 0) return 0
  const seq = getAlternatingSequences(input)
  console.log(seq)
  return findLongestSequence(seq)
}

// [number of 0s, number of 1s, number of 0s....]
function getAlternatingSequences(n: number): number[] {
  const out: number[] = []
  let counting = 0
  let count = 0
  for (let i = 0; i < 32; i++) {
    if ((n & 0b1) !== counting) {
      out.push(count)
      counting = 1 - counting
      count = 0
    }
    count++
    n >>>= 1
  }

  out.push(count)
  return out
}

function findLongestSequence(seq: number[]): number {
  let max = 0
  for (let i = 0; i < seq.length; i += 2) {
    const left = seq[i - 1] ?? 0
    const right = seq[i + 1] ?? 0
    let iterationMax = 0
    if (seq[i] === 1) {
      // can merge
      iterationMax = left + 1 + right
    } else if (seq[i] > 1) {
      // can't merge
      iterationMax = 1 + Math.max(left, right)
    } else if (seq[i] === 0) {
      // only when the number is starting with 1s, that the first 0 counter will be 0
      // and at this point we won't get any on the left side of the array,
      // so just equal the rightside of the value
      iterationMax = right
    }

    max = Math.max(max, iterationMax)
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

export function flipBit(n: number): number {
  if (~n === 0) return 32
  if (n === 0) return 0

  let max = 0
  let curr = 0
  let prev = 0
  while (n) {
    if ((n & 0b1) === 1) {
      curr++
    } else if ((n & 0b1) === 0) {
      prev = curr
      curr = 0
    }

    max = Math.max(max, curr + 1 + prev)
    n >>>= 1
  }
  return max
}
