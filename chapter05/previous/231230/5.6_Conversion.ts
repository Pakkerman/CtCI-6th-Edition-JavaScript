// Input      29 / 11101, 15 / 01111
// Output:    2

export function conversion(n: number, t: number): number {
  let diff = n ^ t
  let count = 0
  for (; diff !== 0; diff &= diff - 1) count++
  return count
}
