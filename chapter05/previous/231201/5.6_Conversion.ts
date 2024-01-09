// Input      29 / 11101, 15 / 01111
// Output:    2

export function conversion(n: number, t: number): number {
  // XOR 2 values to get the different bits
  let curr = n ^ t
  let count = 0
  while (curr) {
    if ((curr & 0b1) === 1) count++
    curr >>>= 1
  }

  return count
}

export function solution(n: number, t: number): number {
  let count = 0
  // i & (i - 1) will be 11100100 & 11100011 => 11100000, this line will trash one 1 from the right one at a time
  for (let i = n ^ t; i !== 0; i &= i - 1) count++
  return count
}
