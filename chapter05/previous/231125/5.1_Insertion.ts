export function insertion(n: number, m: number, i: number, j: number): number {
  const result = n | (m << i)
  return result
}

// solution

// Input: N = 1000000000, M = 10011, i = 2 j = 6
// Output: N = 10001001100

export function insertionSolution(
  n: number,
  m: number,
  i: number,
  j: number
): number {
  const left = ~0b0 << (j + 1) // 1110000000
  const right = (1 << i) - 1 // 0000000011
  const mask = left | right

  const clearedN = n & mask
  const shiftedM = m << i
  return clearedN | shiftedM
}
