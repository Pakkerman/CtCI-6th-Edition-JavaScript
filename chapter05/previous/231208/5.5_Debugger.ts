// the code (n & (n - 1) == 0) will get the first 1 to from the right going left, and if after we ditch that 1 still is not 0, that means we got something like 1100 & 1011 => 1000, which is not 0, so this code is to check if the number given is a power of 2. because only when there is 1 one, 1000 & 0111 => 0 will equal 0.

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
