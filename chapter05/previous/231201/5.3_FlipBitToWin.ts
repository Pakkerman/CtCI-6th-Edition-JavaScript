// input: 11011101111

export function flip(n: number): number {
  if (n === 0) return 0
  if (n === -1) return 32

  const seq = getAlternatingSequences(n)
  return findLongestSequence(seq)
}

// [number of 0s, number of 1s, number of 0s....]
function getAlternatingSequences(n: number): number[] {
  const seq: number[] = []

  let searching = 0
  let curr = n
  let count = 0
  for (let i = 0; i < 32; i++) {
    if ((curr & 0b1) !== searching) {
      seq.push(count)
      count = 0
      searching = 1 - searching
    }

    count++
    curr >>>= 1
  }
  seq.push(count)
  return seq
}

function findLongestSequence(seq: number[]): number {
  let max = 1
  for (let i = 0; i < seq.length; i += 2) {
    const zeros = seq[i]
    const left = seq[i - 1] ?? 0
    const right = seq[i + 1] ?? 0

    let currMax = 0
    if (zeros === 1) {
      currMax = left + 1 + right
    } else if (zeros > 1) {
      currMax = Math.max(left, right) + 1
    } else if (zeros === 0) {
      currMax = Math.max(left, right)
    }
    max = Math.max(currMax, max)
  }

  return max
}

// Constant space
// 11011101111
export function flipBit(n: number): number {
  let max = 0
  let curr = 0
  let prev = 0

  while (n) {
    // if last bit is 1
    if ((n & 1) === 1) {
      curr++
    } else {
      // if you encounter the first 0, curr will be set to 0 and shift cur value to prev
      // prev will only persist if that you dont encounter 2 zeros in a row, that will be
      // so that prev get set to curr again, which is 0 because we didnt add anything to it yet
      prev = curr
      curr = 0
    }

    // because the if statement lines up, we can be assure that prev and curr is always be representive of 2 values that is divide apart by only one zero, so we compensate by adding 1, that is the requirement of the flipping only 1 bit to make the 1s continuous.
    max = Math.max(curr + prev + 1, max)
    n >>>= 1
  }
  return max
}
