// as for the run time, lets see, given n = 32 bits, we run 32 / 2 times, that is O(n / 2) still O(n)

// 111001 to 110110
export function solution(n: number): number {
  const odd = n & 0x55555555
  const even = n & 0xaaaaaaaa
  return (even >>> 1) | (odd << 1)
}

// in this case, do not count 0 bit as the even number. just use the normal intuition, odd, 1 3 5 7, even 2 4 6 8
// move odd to left by 1, and move even to right by 1
