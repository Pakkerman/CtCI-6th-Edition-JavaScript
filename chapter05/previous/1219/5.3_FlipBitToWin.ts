// input: 11011101111

export function flip(n: number): number {
  const seq = getAlternatingSequences(n)
  console.log(seq)
  return findLongestSequence(seq)
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

    let curr = 0
    if (zeros === 1) {
      curr = left + right + 1
    } else if (zeros > 1) {
      curr = Math.max(left, right) + 1
    } else if (zeros === 0) {
      curr = Math.max(left, right)
    }

    max = Math.max(curr, max)
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
  while (n) {
    if ((n & 0b1) === 1) {
      curr++
    }
    if ((n & 0b1) === 0) {
      prev = curr
      curr = 0
    }

    n >>>= 1
    max = Math.max(curr + prev + 1, max)
  }

  return max
}
