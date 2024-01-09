// input: 11011101111

export function flip(n: number): number {
  const sequence = getAlternatingSequences(n)
  console.log(sequence)
  return findLongestSequence(sequence)
}

// [number of 0s, number of 1s, number of 0s....]
function getAlternatingSequences(n: number): number[] {
  const out: number[] = []

  let searching = 0
  let count = 0
  for (let i = 0; i < 32; i++) {
    if ((n & 0b1) !== searching) {
      out.push(count)
      count = 0
      searching = 1 - searching
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
  if (~n === 0) return 32

  let max = 1
  let curr = 0
  let prev = 0

  while (n != 0) {
    if ((n & 0b1) === 1) {
      curr++
    } else {
      prev = curr
      curr = 0
    }

    max = Math.max(max, curr + prev + 1)
    n >>>= 1
  }

  return max
}
