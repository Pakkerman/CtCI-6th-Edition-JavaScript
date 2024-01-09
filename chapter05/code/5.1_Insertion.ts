export function insertionSolution(
  n: number,
  m: number,
  i: number,
  j: number
): number {
  // - Input: N = 1000000000, M = 10011, i = 2 j = 6
  // - Output: N = 10001001100
  // mask: 1110000011

  const left = ~0b0 << j
  const right = (0b1 << i) - 1
  const mask = left | right

  return (n & mask) | (m << i)
}
