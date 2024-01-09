// Input      29 / 11101, 15 / 01111
// Output:    2

export function conversion(n: number, t: number): number {
  const diff = t ^ n
  let count = 0
  for (let i = diff; i != 0; i &= i - 1) count++
  return count
}
