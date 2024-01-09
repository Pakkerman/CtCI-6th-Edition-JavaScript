export function checkPow2(limit: number): string {
  let out: number[] = []

  let count = 0
  for (let i = 1; i < limit + 1; i++) {
    if (Math.log2(i) % 1 === 0) {
      count++
      out.push(i)
    }
  }
  return out.join(',')
}

export function checkPow2Bit(limit: number): string {
  let out: number[] = []

  let count = 0
  for (let i = 1; i < limit + 1; i++) {
    if ((i & (i - 1)) == 0) {
      count++
      out.push(i)
    }
  }
  return out.join(',')
}
