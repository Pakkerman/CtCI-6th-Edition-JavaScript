// This method shifts 1 over by i bits, creating a value that looks like 00010000. By performing an AND with num, we clear all bits other than the bit at bit i, Finally, we compare that to 0. If that new value is not zero, then bit i must have a 1. Otherwise i is a 0.
export function checkBit(num: number, i: number): boolean {
  const mask = 0b1 << i
  return (mask & num) != 0
}

// SetBit shifts 1 over by i bits, creating a value like 0010000. By performing an OR with num, only the value at bit i will change. All other bits of the mask are zero and will not affect num
export function setBit(num: number, i: number): number {
  const mask = 0b1 << i
  return mask | num
}

// This method operates in almost the reverse of setBit. First, we create a number like 11101111 by creating the reverse of it (00010000) and negating it. Then, we perform an AND with num.This will clear the ith bit and leave the remainder unchanged.
export function clearBit(num: number, i: number): number {
  const mask = ~(0b1 << i)
  return mask & num
}

// To clear all bits from the most significant bit through i (inclusive), we create a mask with a 1 at the ith bit (1 << i). Then, we subtract 1 from it, giving us a sequence of 0s followed by i 1s. We then AND our number with this mask to leave just the last i bits
export function clearBitsMSBToIth(num: number, i: number): number {
  const mask = (0b1 << i) - 1
  return mask & num
}

// To clear all bits from i through 0 (inclusive), we take a sequence of all 1s (which is -1) and shift it left by i + 1 bits, that gives us a sequence of 1s (in the most significant bits) followed by i 0 bits
export function clearBitsIthTo0(num: number, i: number): number {
  const mask = ~0b0 << (i + 1)
  return mask & num
}
