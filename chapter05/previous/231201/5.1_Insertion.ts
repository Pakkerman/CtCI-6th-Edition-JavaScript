export function insertionSolution(
  n: number,
  m: number,
  i: number,
  j: number
): number {
  // - Input: N = 1000000000, M = 10011, i = 2 j = 6
  // - Output: N = 10001001100
  // do a mask that clear range i to j, 1110000011 for insertion
  // const left = ~0 << (j + 1)
  // const right = (0b1 << (i + 1)) - 1
  // const mask = left | right

  // n &= mask
  // m <<= i

  // SUPER TRICKY ONE LINER
  return (n & ((~0 << (j + 1)) | ((0b1 << (i + 1)) - 1))) | (m << i)
}
