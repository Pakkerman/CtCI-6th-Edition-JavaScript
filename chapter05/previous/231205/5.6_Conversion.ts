// Input      29 / 11101, 15 / 01111
// Output:    2

export function conversion(n: number, t: number): number {
  // 11101, 01111, which bits needs to bits,
  // XOR, 0 ^ 0 = 0, 0 ^ 1 = 1, 1 ^ 1 = 0
  // so only 1 is in the 2 bit will XOR into 1, that means we XOR the 2 number to get the difference, represents as 1 in the result

  let differnece = n ^ t
  if (differnece === 0) return 0
  // use the n & (n - 1), we nullify single 1 from the right one at a time
  let count = 1
  while ((differnece &= differnece - 1)) count++
  return count
}
