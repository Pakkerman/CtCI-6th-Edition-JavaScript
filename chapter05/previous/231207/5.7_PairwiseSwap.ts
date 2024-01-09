// as for the run time, lets see, given n = 32 bits, we run 32 / 2 times, that is O(n / 2) still O(n)

export function solution(n: number): number {
  const even = n & 0xaaaaaaaa
  const odd = n & 0x55555555
  return (odd << 1) | (even >>> 1)
}
