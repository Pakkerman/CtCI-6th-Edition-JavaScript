// Input      29 / 11101, 15 / 01111
// Output:    2

export function conversion(n: number, t: number): number {
  const not = n ^ t
  let count = 0
  for (let i = not; i !== 0; i &= i - 1) {
    count++
  }
  return count
}
