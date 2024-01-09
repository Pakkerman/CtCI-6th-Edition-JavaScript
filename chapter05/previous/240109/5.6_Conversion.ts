// Input      29 / 11101, 15 / 01111
// Output:    2

export function conversion(n: number, t: number): number {
  let not = n ^ t
  console.log(not.toString(2))
  let count = 0
  while (not) {
    not &= not - 1
    count++
  }
  return count
}
