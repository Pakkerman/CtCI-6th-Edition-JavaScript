// input: 11011101111

export function flip(n: number): number {
  const seq = getAlternatingSequences(n)
  console.log(seq)
  return findLongestSequence(seq)
}

// [number of 0s, number of 1s, number of 0s....]
function getAlternatingSequences(n: number): number[] {
  const out: number[] = []
  let finding = 0
  let count = 0
  for (let i = 0; i < 32; i++) {
    if ((n & 0b1) !== finding) {
      out.push(count)
      finding = 1 - finding
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
    const zeros = seq[i]
    const left = seq[i - 1] || 0
    const right = seq[i + 1] || 0

    let curr = 0
    if (zeros === 1) {
      curr = left + 1 + right
    } else if (zeros === 0) {
      curr = Math.max(left, right)
    } else if (1 < zeros) {
      curr = Math.max(left, right) + 1
    }
    max = Math.max(curr, max)
  }

  return max
}

// Constant space
// 11011101111
export function flipBit(n: number): number {
  // -1 is 32 1s so we go through the function will get 33
  // block it here
  if (n === -1) return 32
  // 32 1's is the same, will result in 33
  // flip it and if is 0 return 32
  if (~n === 0) return 32

  // max starting at 1, because if we got 1, we will get 1 ,but if we got 0, we can flip that , and total 1's is just 1, we will just return the max right away, because while(n) when n is 0, will not run
  let max = 1
  let curr = 0
  let prev = 0
  while (n) {
    if ((n & 0b1) === 1) {
      curr++
    } else if ((n & 0b1) === 0) {
      prev = curr
      curr = 0
    }

    max = Math.max(prev + curr + 1, max)
    n >>>= 1
  }

  return max
}
