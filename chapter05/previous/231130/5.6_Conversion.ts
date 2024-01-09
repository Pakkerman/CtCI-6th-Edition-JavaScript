// Input      29 / 11101, 15 / 01111
// Output:    2

export function conversion(n: number, t: number): number {
  let xor = n ^ t
  // 11101
  // 01111
  // 01001

  let count = 0
  while (xor) {
    if ((xor & 1) === 1) count++
    xor >>>= 1
  }

  return count
}

export function solution(n: number, t: number): number {
  let count = 0
  let curr = n ^ t
  for (; curr != 0; curr = curr & (curr - 1)) count++
  // curr = curr & (curr - 1) will destory a 1 from the right one at a time, this will replace the way we use right shift operator to count ones
  // 010010 & 010010 - 1
  // 010010 & 010001 => 010000 count = 1
  // 010000 & 001111 => 000000 count = 2

  return count
}
