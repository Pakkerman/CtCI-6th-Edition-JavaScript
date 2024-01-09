// Input      29 / 11101, 15 / 01111
// Output:    2

export function conversion(n: number, t: number): number {
  let count = 0
  for (let i = n ^ t; i != 0; i = i & (i - 1)) count++
  return count
}
