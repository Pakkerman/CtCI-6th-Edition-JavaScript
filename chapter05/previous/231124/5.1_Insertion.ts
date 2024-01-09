export function insertion(n: number, m: number, i: number, j: number): number {
  const result = n | (m << i)
  return result
}

// solution
export function insertionSolution(
  n: number,
  m: number,
  i: number,
  j: number
): number {
  const ones = ~0 // 1111111111

  const left = ones << (j + 1) // 11110000000
  const right = (1 << i) - 1 // 00000000011
  const mask = left | right // 11110000011

  const nCleared = mask & n // 10000000000
  const mShifted = m << i //   00001001100
  return nCleared | mShifted
}
