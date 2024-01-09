// Input      29 / 11101, 15 / 01111
// Output:    2

export function conversion(n: number, t: number): number {
  let count = 0
  let diff = n ^ t
  while (diff) {
    diff &= diff - 1
    count++
  }
  return count
}
