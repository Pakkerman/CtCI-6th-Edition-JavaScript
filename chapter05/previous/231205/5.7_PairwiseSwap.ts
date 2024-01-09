export function brute(n: number): number {
  let mask = 0b11 // we use this mask to flip bits, 2 at a time, this will flip 10 or 01, but if get 00 or 11, will result 11 and 00, which is not what we want, so make another if statement to rule 00 and 11 out.
  for (let i = 0; i < 32; i += 2) {
    // checkpair will check n >>> i, if n == 00 will give 00, if n == 11 will give 11, we need to flip when n is 10 or 01, also we need to account for the left remaining bits, use AND with 0b11 to clear them out
    const checkpair = (n >>> i) & 0b11
    if (checkpair === 0b10 || checkpair === 0b01) n ^= mask
    mask <<= 2 // mask => 1100,
  }
  return n
}

// as for the run time, lets see, given n = 32 bits, we run 32 / 2 times, that is O(n / 2) still O(n)

export function solution(n: number): number {
  // 1001 & 1010 => 1000 >>> 1 => 0100
  // 1001 & 0101 => 0001 << 1 => 0010
  // 0100 | 0010 => 0110

  // 1111 & 1010 => 1010 >>> 1 => 0101
  // 1111 & 0101 => 0101 << 1 => 1010
  // 0101 | 1010 => 1111
  const odd = 0b01010101010101010101010101010101 & n
  // or simply 0x5 is 0101, we need 8 of them to represent 32 bits, so 0x5555555
  const even = 0b10101010101010101010101010101010 & n
  // 0xa = 1010, we do 0xaaaaaaa
  // and shift the odds left, and the even right, and we OR them
  return (odd << 1) | (even >>> 1)
}
