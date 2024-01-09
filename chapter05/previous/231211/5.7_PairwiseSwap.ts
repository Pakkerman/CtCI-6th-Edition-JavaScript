// as for the run time, lets see, given n = 32 bits, we run 32 / 2 times, that is O(n / 2) still O(n)

// 111001 to 110110
export function solution(n: number): number {
  // swap the even and odd bits
  const even = n & 0xaaaaaaaa
  const odd = n & 0x55555555
  return (even >>> 1) | (odd << 1)
}
