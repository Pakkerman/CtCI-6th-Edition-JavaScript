// Input      29 / 11101, 15 / 01111
// Output:    2

export function conversion(n: number, t: number): number {
  let NOT = n ^ t
  let count = 0
  while (NOT) {
    NOT &= NOT - 1
    count++
  }
  return count
}
